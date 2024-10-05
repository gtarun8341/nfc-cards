const Settings = () => {
    // Dummy data for settings
    const settingsData = {
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      notificationPreferences: {
        email: true,
        sms: false,
      },
      privacySettings: {
        profileVisibility: true,
        dataSharing: false,
      },
    };
  
    // Function to handle input changes
    const handleInputChange = (e) => {
      console.log(`${e.target.name}: ${e.target.checked}`);
    };
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
  
        {/* Account Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                defaultValue={settingsData.username}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={settingsData.email}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>
  
        {/* Notification Preferences Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={settingsData.notificationPreferences.email}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                checked={settingsData.notificationPreferences.sms}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="smsNotifications" className="ml-2 text-sm text-gray-700">SMS Notifications</label>
            </div>
          </div>
        </div>
  
        {/* Privacy Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="profileVisibility"
                name="profileVisibility"
                checked={settingsData.privacySettings.profileVisibility}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="profileVisibility" className="ml-2 text-sm text-gray-700">Profile Visibility</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dataSharing"
                name="dataSharing"
                checked={settingsData.privacySettings.dataSharing}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="dataSharing" className="ml-2 text-sm text-gray-700">Data Sharing</label>
            </div>
          </div>
        </div>
  
        {/* Save Settings Button */}
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Save Settings
          </button>
        </div>
      </div>
    );
  };
  
  export default Settings;
  