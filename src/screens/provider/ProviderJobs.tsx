export default function ProviderJobs() {
  return (
    <div className="flex flex-col min-h-full bg-neutral-50 pt-12">
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold font-sans">My Jobs</h1>
      </div>
      <div className="px-6 flex-1 flex flex-col items-center justify-center text-neutral-400">
         <p className="font-medium">No active jobs right now.</p>
      </div>
    </div>
  );
}
