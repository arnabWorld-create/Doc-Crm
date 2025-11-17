import prisma from '@/lib/prisma';
import CalendarView from '@/components/CalendarView';

interface CalendarPageProps {
  searchParams?: {
    month?: string;
    year?: string;
  };
}

const CalendarPage = async ({ searchParams }: CalendarPageProps) => {
  const today = new Date();
  const currentMonth = searchParams?.month ? parseInt(searchParams.month) : today.getMonth();
  const currentYear = searchParams?.year ? parseInt(searchParams.year) : today.getFullYear();

  // Get first and last day of the month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  // Fetch all visits with dates in this month
  const visits = await prisma.visit.findMany({
    where: {
      visitDate: {
        gte: firstDay,
        lte: lastDay,
      },
    },
    include: {
      patient: {
        select: {
          id: true,
          patientId: true,
          name: true,
          age: true,
          gender: true,
          contact: true,
        },
      },
    },
    orderBy: {
      visitDate: 'asc',
    },
  });

  // Transform visits to consultations format
  const consultations = visits.map(visit => ({
    id: visit.patient.id,
    name: visit.patient.name,
    age: visit.patient.age,
    gender: visit.patient.gender,
    contact: visit.patient.contact,
    consultationDate: visit.visitDate,
  }));

  // Fetch all visits with follow-up dates in this month
  const followUpVisits = await prisma.visit.findMany({
    where: {
      followUpDate: {
        gte: firstDay,
        lte: lastDay,
      },
    },
    include: {
      patient: {
        select: {
          id: true,
          patientId: true,
          name: true,
          age: true,
          gender: true,
          contact: true,
        },
      },
    },
    orderBy: {
      followUpDate: 'asc',
    },
  });

  // Transform follow-up visits
  const followUps = followUpVisits.map(visit => ({
    id: visit.patient.id,
    name: visit.patient.name,
    age: visit.patient.age,
    gender: visit.patient.gender,
    contact: visit.patient.contact,
    followUpDate: visit.followUpDate,
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-teal mb-1 sm:mb-2">
          Appointment Calendar
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          View consultations and follow-up appointments by date
        </p>
      </div>

      <CalendarView
        consultations={consultations}
        followUps={followUps}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
    </div>
  );
};

export default CalendarPage;
