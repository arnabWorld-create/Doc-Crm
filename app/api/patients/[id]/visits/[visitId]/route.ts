import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch a single visit
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; visitId: string } }
) {
  try {
    const visit = await prisma.visit.findUnique({
      where: {
        id: params.visitId,
        patientId: params.id,
      },
    });

    if (!visit) {
      return NextResponse.json(
        { message: 'Visit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(visit);
  } catch (error) {
    console.error('Failed to fetch visit:', error);
    return NextResponse.json(
      { message: 'Failed to fetch visit' },
      { status: 500 }
    );
  }
}

// PUT - Update a visit
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; visitId: string } }
) {
  try {
    const body = await req.json();

    const visit = await prisma.visit.update({
      where: {
        id: params.visitId,
        patientId: params.id,
      },
      data: {
        visitDate: new Date(body.visitDate),
        visitType: body.visitType,
        chiefComplaint: body.chiefComplaint || null,
        signs: body.signs || null,
        diagnosis: body.diagnosis || null,
        treatment: body.treatment || null,
        medicines: body.medicines || null,
        temp: body.temp ? parseFloat(body.temp) : null,
        spo2: body.spo2 ? parseInt(body.spo2) : null,
        pulse: body.pulse ? parseInt(body.pulse) : null,
        bloodPressure: body.bloodPressure || null,
        followUpDate: body.followUpDate ? new Date(body.followUpDate) : null,
        followUpNotes: body.followUpNotes || null,
        reports: body.reports ? JSON.stringify(body.reports) : null,
      },
    });

    return NextResponse.json(visit);
  } catch (error) {
    console.error('Failed to update visit:', error);
    return NextResponse.json(
      { message: 'Failed to update visit' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a visit
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; visitId: string } }
) {
  try {
    await prisma.visit.delete({
      where: {
        id: params.visitId,
        patientId: params.id,
      },
    });

    return NextResponse.json({ message: 'Visit deleted successfully' });
  } catch (error) {
    console.error('Failed to delete visit:', error);
    return NextResponse.json(
      { message: 'Failed to delete visit' },
      { status: 500 }
    );
  }
}
