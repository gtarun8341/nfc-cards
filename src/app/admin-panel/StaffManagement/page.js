// pages/staff-management.js

import { useState } from 'react';

const StaffManagementPage = () => {
  const [staff, setStaff] = useState([{ id: 1, name: 'John Doe' }]);
  const [newStaffName, setNewStaffName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const addStaff = () => {
    if (newStaffName.trim() === '') return;
    setStaff([...staff, { id: Date.now(), name: newStaffName }]);
    setNewStaffName('');
  };

  const editStaff = (id) => {
    const staffToEdit = staff.find((s) => s.id === id);
    if (staffToEdit) {
      setNewStaffName(staffToEdit.name);
      setEditMode(true);
      setCurrentId(id);
    }
  };

  const updateStaff = () => {
    if (newStaffName.trim() === '' || currentId === null) return;
    setStaff(
      staff.map((s) => (s.id === currentId ? { ...s, name: newStaffName } : s))
    );
    setNewStaffName('');
    setEditMode(false);
    setCurrentId(null);
  };

  const deleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Staff Management</h2>
      <input
        type="text"
        value={newStaffName}
        onChange={(e) => setNewStaffName(e.target.value)}
        placeholder={editMode ? "Edit staff name" : "Enter staff name"}
        className="border rounded p-2 w-full mb-3"
      />
      {editMode ? (
        <button
          onClick={updateStaff}
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition mb-3"
        >
          Update Staff
        </button>
      ) : (
        <button
          onClick={addStaff}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition mb-3"
        >
          Add Staff
        </button>
      )}
      <ul className="mt-5">
        {staff.map((s) => (
          <li key={s.id} className="py-2 border-b flex justify-between items-center">
            {s.name}
            <div>
              <button
                onClick={() => editStaff(s.id)}
                className="text-yellow-500 hover:text-yellow-600 mx-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStaff(s.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffManagementPage;
