import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    onLookup: (id: string) => void;
}

export const AirdropLookup = ({ onLookup }: Props) => {
    const [id, setId] = useState('');
    const queryClient = useQueryClient();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) onLookup(id);
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Lookup Airdrop</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="airdropId" className="block text-sm font-medium text-gray-400 mb-1">
                        Airdrop ID
                    </label>
                    <input
                        type="text"
                        id="airdropId"
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value);
                            ('');
                            queryClient.removeQueries({ queryKey: ['airdrop'] });
                        }}
                        placeholder="Enter Streamflow Airdrop ID..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!id}
                >
                    View Airdrop
                </button>
            </form>
        </div>
    );
};
