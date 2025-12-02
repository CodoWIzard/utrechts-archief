"use client";

import { useNotification } from '../hooks/useNotification';
import NotificationContainer from '../components/NotificationContainer';

export default function TestNotifications() {
  const { notifications, addNotification, removeNotification } = useNotification();

  const showSuccessNotification = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'This is a success notification.'
    });
  };

  const showErrorNotification = () => {
    addNotification({
      type: 'error',
      title: 'Error!',
      message: 'This is an error notification.'
    });
  };

  const showWarningNotification = () => {
    addNotification({
      type: 'warning',
      title: 'Warning!',
      message: 'This is a warning notification.'
    });
  };

  const showInfoNotification = () => {
    addNotification({
      type: 'info',
      title: 'Info',
      message: 'This is an info notification.'
    });
  };

  const simulateDeleteError = () => {
    addNotification({
      type: 'error',
      title: 'Delete Failed',
      message: 'Failed to delete page. Network error occurred while deleting page. Please check your connection and try again.'
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-8">Test Notifications</h1>
        
        <div className="space-y-4">
          <button
            onClick={showSuccessNotification}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Show Success Notification
          </button>
          
          <button
            onClick={showErrorNotification}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Show Error Notification
          </button>
          
          <button
            onClick={showWarningNotification}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Show Warning Notification
          </button>
          
          <button
            onClick={showInfoNotification}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Show Info Notification
          </button>
          
          <button
            onClick={simulateDeleteError}
            className="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg font-medium"
          >
            Simulate Delete Error
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="text-gray-700">
            Click the buttons above to test different types of notifications. 
            The notifications will appear in the top-right corner and automatically 
            disappear after 5 seconds, or you can click the × to dismiss them manually.
          </p>
        </div>
      </div>
      
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
}