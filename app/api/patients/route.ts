import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generatePatientId } from '@/lib/patientUtils';
import { requireAuth } from '@/lib/api-auth';

// GET all patients
export async function GET(req: NextRequest) {
  // Verify authentication
  const { error, user } = await requireAuth(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { contact: { contains: search } },
        { patientId: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    const patients = await prisma.patient.findMany({
      where: whereClause,
      include: {
        visits: {
          orderBy: { visitDate: 'desc' },
          // Get all visits for accurate count
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    return NextResponse.json(
      { message: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

// POST - Create new patient with first visit
export async function POST(req: NextRequest) {
  // Verify authentication
  const { error } = await requireAuth(req);
  if (error) return error;

  try {
    const body = await req.json();

    
    // Generate patient ID
    const patientId = await generatePatientId();


    // Separate patient info from visit info
    const { name, age, gender, contact, address, bloodGroup, allergies, chronicConditions, ...visitData } = body;

    // Prepare visit data
    const visitCreateData: any = {
      visitDate: visitData.consultationDate ? new Date(visitData.consultationDate) : new Date(),
      visitType: 'Consultation',
    };

    // Add optional fields
    if (visitData.chiefComplaint) visitCreateData.chiefComplaint = visitData.chiefComplaint;
    if (visitData.signs) visitCreateData.signs = visitData.signs;
    if (visitData.investigations) visitCreateData.investigations = visitData.investigations;
    if (visitData.diagnosis) visitCreateData.diagnosis = visitData.diagnosis;
    if (visitData.treatment) visitCreateData.treatment = visitData.treatment;
    if (visitData.medicines) visitCreateData.medicines = visitData.medicines;
    if (visitData.history) visitCreateData.notes = visitData.history;
    if (visitData.bloodPressure) visitCreateData.bloodPressure = visitData.bloodPressure;
    if (visitData.referredTo) visitCreateData.referredTo = visitData.referredTo;
    if (visitData.followUpNotes) visitCreateData.followUpNotes = visitData.followUpNotes;

    // Handle numeric fields
    if (visitData.temp && visitData.temp !== '') {
      const tempNum = parseFloat(visitData.temp);
      if (!isNaN(tempNum)) visitCreateData.temp = tempNum;
    }
    if (visitData.spo2 && visitData.spo2 !== '') {
      const spo2Num = parseInt(visitData.spo2);
      if (!isNaN(spo2Num)) visitCreateData.spo2 = spo2Num;
    }
    if (visitData.pulse && visitData.pulse !== '') {
      const pulseNum = parseInt(visitData.pulse);
      if (!isNaN(pulseNum)) visitCreateData.pulse = pulseNum;
    }
    if (visitData.weight && visitData.weight !== '') {
      const weightNum = parseFloat(visitData.weight);
      if (!isNaN(weightNum)) visitCreateData.weight = weightNum;
    }

    // Handle reports - convert array to JSON string
    if (visitData.reports && Array.isArray(visitData.reports) && visitData.reports.length > 0) {
      visitCreateData.reports = JSON.stringify(visitData.reports);
    }

    // Handle follow-up date
    if (visitData.followUpDate && visitData.followUpDate !== '') {
      visitCreateData.followUpDate = new Date(visitData.followUpDate);
    }



    // Create patient with first visit
    const patient = await prisma.patient.create({
      data: {
        patientId,
        name,
        age: age ? parseInt(age) : null,
        gender,
        contact,
        address,
        bloodGroup,
        allergies,
        chronicConditions,
        visits: {
          create: visitCreateData,
        },
      },
      include: {
        visits: true,
      },
    });


    return NextResponse.json(patient, { status: 201 });
  } catch (error: any) {
    console.error('❌ Failed to create patient - Full error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    return NextResponse.json(
      { message: 'Failed to create patient', error: error.message || String(error) },
      { status: 500 }
    );
  }
}
