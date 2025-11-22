import { useAppConfig } from '#imports';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import {
  Calendar,
  House,
  Mail,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import { useState } from 'react';

function App() {
  const config = useAppConfig();
  const {
    appearance,
    system,
    ui,
    loading,
    updateAppearance,
    updateSystem,
    updateUI,
    resetSettings,
  } = useSettings();
  const { setTheme } = useTheme({
    theme: appearance.theme,
    onThemeChange: (theme) => updateAppearance({ theme }),
  });

  const [activeTab, setActiveTab] = useState(ui.activeTab || 'home');

  const themeOptions = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ] as const;

  const handleSyncIntervalChange = (value: string) => {
    const interval = parseInt(value);
    if (!isNaN(interval) && interval > 0) {
      updateSystem({ syncInterval: interval });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    updateUI({ activeTab: value });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' && (
            <div className="space-y-4 p-4">
              <div>
                <h2 className="text-base font-semibold flex items-center gap-2 mb-2">
                  Welcome to Sidepanel Template
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                    v1.0.0
                  </span>
                </h2>
                <p className="text-muted-foreground mb-4">
                  A modern browser extension template built with WXT, Tailwind
                  CSS 4.0, and React.
                </p>
                <div className="grid gap-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold">
                        🚀 Modern Stack
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Built with WXT, React, TypeScript, and Tailwind CSS 4.0
                        for the best developer experience.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold">
                        🎨 Beautiful Design
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Clean and accessible UI components with Tailwind CSS.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold">
                        ⚡ Fast Development
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Hot reload and modern build tools for rapid development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-8 p-4">
              {/* Profile Section */}
              <div className="text-center space-y-4">
                <div className="h-20 w-20 mx-auto rounded-full ring-2 ring-offset-2 ring-primary/10 overflow-hidden bg-secondary">
                  <img
                    src="https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    className="h-full w-full flex items-center justify-center text-lg font-semibold bg-secondary text-secondary-foreground"
                    style={{ display: 'none' }}
                  >
                    SC
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">User</h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>user@example.com</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    Premium User
                  </span>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Account Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Member Since
                    </span>
                    <span className="text-sm font-medium">July 2025</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Last Login
                    </span>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full border border-green-600 text-green-600">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Edit Profile
                </button>
                <button className="w-full px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 p-4">
              {/* Appearance Settings */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Appearance</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Customize the look and feel
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium block">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = appearance.theme === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={`flex flex-col gap-1 h-auto py-3 px-3 rounded-md border transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <Icon className="h-4 w-4 mx-auto" />
                          <span className="text-xs">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* System Settings */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">System Settings</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Core extension functionality
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium block">
                      Notifications
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Enable push notifications
                    </p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={system.notifications}
                    onClick={() =>
                      updateSystem({ notifications: !system.notifications })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      system.notifications ? 'bg-primary' : 'bg-input'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        system.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium block">
                      Sync Interval (minutes)
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Data synchronization frequency
                    </p>
                  </div>
                  <input
                    type="number"
                    value={system.syncInterval}
                    onChange={(e) => handleSyncIntervalChange(e.target.value)}
                    className="w-20 h-8 text-xs px-2 rounded-md border border-input bg-background"
                    min="1"
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Runtime Configuration - Read Only */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Runtime Configuration
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Values from app.config.ts (read-only)
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium block">
                      Config Chat Status
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Chat setting from runtime config
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      config.features?.enableChat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {config.features?.enableChat ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium block">
                      Config Max Tokens
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Token limit from runtime config
                    </p>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full border border-input">
                    {config.features?.maxTokens}
                  </span>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={resetSettings}
                >
                  Reset
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="h-auto border-t bg-transparent">
          <div className="flex w-full">
            <button
              onClick={() => handleTabChange('home')}
              className={`relative flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'home'
                  ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <House className="h-4 w-4" />
              History
            </button>
            <button
              onClick={() => handleTabChange('profile')}
              className={`relative flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'profile'
                  ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="h-4 w-4" />
              Try on
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`relative flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'settings'
                  ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
