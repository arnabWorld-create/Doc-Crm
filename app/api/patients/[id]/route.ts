import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/api-auth';

// GET single patient with all visits
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const { error } = await requireAuth(req);
  if (error) return error;

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        visits: {
          orderBy: { visitDate: 'desc' },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Failed to fetch patient:', error);
    return NextResponse.json(
      { message: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

// PUT - Update patient basic info
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    const { name, age, gender, contact, address, bloodGroup, allergies, chronicConditions } = body;

    const patient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        name,
        age: age ? parseInt(age) : null,
        gender,
        contact,
        address,
        bloodGroup,
        allergies,
        chronicConditions,
      },
      include: {
        visits: {
          orderBy: { visitDate: 'desc' },
        },
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Failed to update patient:', error);
    return NextResponse.json(
      { message: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

// DELETE patient
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.patient.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Failed to delete patient:', error);
    return NextResponse.json(
      { message: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}
