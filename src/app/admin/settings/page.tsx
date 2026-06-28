
export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight">Settings</h2>

            <div className="bg-white border border-black/5 rounded-sm shadow-sm max-w-3xl">
                <div className="border-b border-black/5 p-6 space-y-2">
                    <h3 className="font-display font-bold uppercase tracking-widest text-sm">Site Configuration</h3>
                    <p className="text-gray-500 text-xs font-medium">Manage general site settings and branding features.</p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-700">Site Name</label>
                        <input
                            type="text"
                            className="w-full border border-black/10 rounded-sm p-3 text-sm focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-black"
                            defaultValue="CFC | Cage Fighting Championship"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-700">Support Email</label>
                        <input
                            type="email"
                            className="w-full border border-black/10 rounded-sm p-3 text-sm focus:outline-none focus:border-[#FE0002] transition-colors font-medium text-black"
                            defaultValue="support@cfc-mma.com"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-black/5 pt-6">
                        <div className="space-y-1">
                            <h4 className="font-display font-bold uppercase tracking-widest text-sm text-black">Maintenance Mode</h4>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Disable site access for visitors while making changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FE0002]"></div>
                        </label>
                    </div>

                    <div className="border-t border-black/5 pt-6 flex justify-end">
                        <button className="bg-[#FE0002] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm shadow-sm active:scale-95">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
