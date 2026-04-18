export default function AdminDashboard() {
  return (
     <div>
        <h2 className="font-bold text-2xl mb-8">Platform Overview</h2>
        <div className="grid grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-neutral-200">
               <div className="text-sm text-neutral-500 font-medium mb-2">Total Users</div>
               <div className="font-mono text-3xl font-bold">1,204</div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-neutral-200">
               <div className="text-sm text-neutral-500 font-medium mb-2">Active Providers</div>
               <div className="font-mono text-3xl font-bold">142</div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-neutral-200">
               <div className="text-sm text-neutral-500 font-medium mb-2">Bookings Today</div>
               <div className="font-mono text-3xl font-bold">38</div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-neutral-200">
               <div className="text-sm text-neutral-500 font-medium mb-2">Revenue Today</div>
               <div className="font-mono text-3xl font-bold text-green-600">₹8,450</div>
           </div>
        </div>
     </div>
  )
}
