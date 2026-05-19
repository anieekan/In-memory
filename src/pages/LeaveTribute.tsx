import TributeForm from '../components/TributeForm';

export default function LeaveTribute() {
  return (
    <div className="pt-24 pb-32 px-6 md:px-12 flex flex-col items-center flex-1 w-full relative min-h-[calc(100vh-64px)] justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-amber/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <TributeForm />
    </div>
  );
}
