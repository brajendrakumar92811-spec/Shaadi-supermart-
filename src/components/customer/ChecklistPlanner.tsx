import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChecklistTask } from '../../types';
import { CheckCircle2, Circle, Plus, Calendar, UserCheck, Sparkles } from 'lucide-react';

export const ChecklistPlanner: React.FC = () => {
  const {
    checklist,
    toggleChecklistTask,
    addChecklistTask,
    weddingDateFilter,
    setWeddingDateFilter,
    language,
  } = useApp();

  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStage, setTaskStage] = useState<ChecklistTask['stage']>('1-2_months');
  const [assignedTo, setAssignedTo] = useState('Rahul');
  const [dueDate, setDueDate] = useState('2026-10-30');
  const [category, setCategory] = useState('General');

  const completedCount = checklist.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / (checklist.length || 1)) * 100);

  const stages: { id: string; label: string; labelHi: string }[] = [
    { id: 'all', label: 'All Tasks', labelHi: 'सभी कार्य' },
    { id: '6-12_months', label: '6-12 Months Out', labelHi: '6-12 महीने पूर्व' },
    { id: '3-6_months', label: '3-6 Months Out', labelHi: '3-6 महीने पूर्व' },
    { id: '1-2_months', label: '1-2 Months Out', labelHi: '1-2 महीने पूर्व' },
    { id: '2_weeks', label: '2 Weeks Out', labelHi: '2 सप्ताह पूर्व' },
    { id: 'wedding_week', label: 'Wedding Week', labelHi: 'शादी का सप्ताह' },
    { id: 'd_day', label: 'D-Day (Wedding Day)', labelHi: 'विवाह दिवस' },
  ];

  const filteredTasks = checklist.filter(t => {
    if (selectedStage !== 'all' && t.stage !== selectedStage) return false;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addChecklistTask({
      title: taskTitle,
      titleHi: taskTitle,
      stage: taskStage,
      assignedTo,
      dueDate,
      completed: false,
      category,
    });

    setTaskTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Date Setup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#6E1428] mb-1">
              Timeline & Coordination
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'en' ? 'Wedding Planning Checklist' : 'विवाह तैयारी चेकलिस्ट'}
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Milestone checklist designed for traditional Indian weddings in Uttar Pradesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-stone-200 text-xs">
              <Calendar className="w-4 h-4 text-[#6E1428]" />
              <span className="text-stone-500 font-medium">Wedding Date:</span>
              <input
                type="date"
                value={weddingDateFilter}
                onChange={e => setWeddingDateFilter(e.target.value)}
                className="font-semibold text-stone-800 bg-transparent focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#6E1428] hover:bg-[#560F1E] rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Close Form' : 'Add Task'}</span>
            </button>
          </div>
        </div>

        {/* Overall Completion Progress */}
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs my-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-sm">Overall Preparedness</span>
              <span className="text-stone-500">
                ({completedCount} of {checklist.length} milestones complete)
              </span>
            </div>
            <span className="font-bold text-[#6E1428]">{progressPercent}%</span>
          </div>

          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#6E1428] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Add Task Modal/Form */}
        {showAddForm && (
          <form
            onSubmit={handleCreateTask}
            className="bg-white p-4 rounded-lg border border-[#8C2337]/40 shadow-md mb-6 space-y-3 text-xs"
          >
            <div className="font-serif text-sm font-bold text-stone-900 mb-1">
              Add New Planning Task
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-medium mb-1">Task Description *</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="e.g. Taste test Halwai sweets for Shagun boxes"
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:ring-1 focus:ring-[#6E1428]"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Timeline Stage</label>
                <select
                  value={taskStage}
                  onChange={e => setTaskStage(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:ring-1 focus:ring-[#6E1428]"
                >
                  <option value="6-12_months">6-12 Months Out</option>
                  <option value="3-6_months">3-6 Months Out</option>
                  <option value="1-2_months">1-2 Months Out</option>
                  <option value="2_weeks">2 Weeks Out</option>
                  <option value="wedding_week">Wedding Week</option>
                  <option value="d_day">D-Day</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Assigned Family Member</label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={e => setAssignedTo(e.target.value)}
                  placeholder="e.g. Pooja, Rahul, Father, Uncle"
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:ring-1 focus:ring-[#6E1428]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 border border-stone-300 rounded text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#6E1428] text-white rounded font-medium hover:bg-[#560F1E] cursor-pointer"
              >
                Save Task
              </button>
            </div>
          </form>
        )}

        {/* Stage Filter Buttons (Permitted as interactive filter buttons under constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 text-xs">
          {stages.map(st => (
            <button
              key={st.id}
              onClick={() => setSelectedStage(st.id)}
              className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedStage === st.id
                  ? 'bg-[#6E1428] text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {language === 'en' ? st.label : st.labelHi}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-xs divide-y divide-stone-100">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleChecklistTask(task.id)}
                className="p-4 flex items-start sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <button
                    type="button"
                    className="mt-0.5 sm:mt-0 text-stone-400 group-hover:text-[#6E1428] transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300" />
                    )}
                  </button>

                  <div>
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors ${
                        task.completed
                          ? 'line-through text-stone-400'
                          : 'text-stone-800'
                      }`}
                    >
                      {language === 'en' ? task.title : task.titleHi}
                    </span>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      <span>Category: {task.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-stone-400" />
                        {task.assignedTo}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      task.completed
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {task.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-stone-500">
              No tasks for this timeline stage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
