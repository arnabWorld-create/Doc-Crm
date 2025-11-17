import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('logo') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File size must be less than 2MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    const filename = 'clinic-logo.png';
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Update clinic profile with logo path
    const logoPath = `/uploads/${filename}`;
    let profile = await prisma.clinicProfile.findFirst();

    if (profile) {
      await prisma.clinicProfile.update({
        where: { id: profile.id },
        data: { logo: logoPath },
      });
    } else {
      await prisma.clinicProfile.create({
        data: {
          clinicName: 'Faith Clinic',
          logo: logoPath,
        },
      });
    }

    return NextResponse.json({ 
      message: 'Logo uploaded successfully',
      logoPath 
    });
  } catch (error) {
    console.error('Failed to upload logo:', error);
    return NextResponse.json(
      { message: 'Failed to upload logo' },
      { status: 500 }
    );
  }
}
