import { PageHeader } from '@/app/components';

export const Settings = () => {
  return (
    <div className="flex-1 bg-stone-50 text-stone-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />
        {/* Settings content will go here */}
      </div>
    </div>
  );
};
