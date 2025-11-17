import PatientForm from '@/components/PatientForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface EditPatientPageProps {
  params: {
    id: string;
  };
}

const EditPatientPage = async ({ params }: EditPatientPageProps) => {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  });

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="p-2 sm:p-3 md:p-4 bg-brand-yellow rounded-lg sm:rounded-xl shadow-lg">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-teal">
            Edit Patient
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">Update patient information for <span className="font-semibold text-brand-yellow">{patient.name}</span></p>
        </div>
      </div>
      <PatientForm defaultValues={patient} />
    </div>
  );
};

export default EditPatientPage;