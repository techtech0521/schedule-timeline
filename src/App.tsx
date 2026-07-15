import { useMemo, useState, type FormEvent } from 'react';
import { Timeline } from './components/timeline';
import { mockDailySchedule } from './data/mockEvents';
import type { ScheduleEvent } from './types/schedule.types';
import './styles/global.css';
import './App.css';

type ScheduleFormState = {
  time: string;
  title: string;
  description: string;
};

const emptyForm: ScheduleFormState = {
  time: '',
  title: '',
  description: '',
};

const createEventId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `event-${Date.now()}`;
};

/**
 * Main App Component
 *
 * Renders an editable daily schedule timeline.
 */
function App() {
  const [events, setEvents] = useState<ScheduleEvent[]>(mockDailySchedule);
  const [form, setForm] = useState<ScheduleFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditing = editingId !== null;

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.time.localeCompare(b.time, 'ja'));
  }, [events]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTime = form.time.trim();
    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();

    if (!trimmedTime || !trimmedTitle) {
      setFormError('時間と予定を入力してください。');
      return;
    }

    if (isEditing) {
      setEvents((currentEvents) =>
        currentEvents.map((currentEvent) =>
          currentEvent.id === editingId
            ? {
                ...currentEvent,
                time: trimmedTime,
                title: trimmedTitle,
                description: trimmedDescription || undefined,
              }
            : currentEvent
        )
      );
    } else {
      const nextEvent: ScheduleEvent = {
        id: createEventId(),
        time: trimmedTime,
        title: trimmedTitle,
        description: trimmedDescription || undefined,
        category: 'other',
      };

      setEvents((currentEvents) => [...currentEvents, nextEvent]);
    }

    resetForm();
  };

  const handleEdit = (event: ScheduleEvent) => {
    setEditingId(event.id);
    setFormError(null);
    setForm({
      time: event.time,
      title: event.title,
      description: event.description ?? '',
    });
  };

  const handleDelete = (id: string) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="container">
      <section className="schedule-editor" aria-labelledby="schedule-editor-title">
        <div className="editor-header">
          <p className="editor-kicker">Schedule Editor</p>
          <h1 id="schedule-editor-title">予定を管理</h1>
          <p>時間、予定、詳細を入力して、タイムラインの予定を追加・編集・削除できます。</p>
        </div>

        <form className="schedule-form" onSubmit={handleSubmit} noValidate>
          <label className="form-field">
            <span>時間</span>
            <input
              type="text"
              value={form.time}
              onChange={(event) => setForm({ ...form, time: event.target.value })}
              placeholder="例: 09:00-10:00"
              required
            />
          </label>

          <label className="form-field">
            <span>予定</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="例: チームミーティング"
              required
            />
          </label>

          <label className="form-field form-field-full">
            <span>詳細</span>
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="予定の内容やメモを入力"
              rows={3}
            />
          </label>

          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}

          <div className="form-actions">
            <button className="primary-button" type="submit">
              {isEditing ? '予定を更新' : '予定を追加'}
            </button>
            {isEditing && (
              <button className="secondary-button" type="button" onClick={resetForm}>
                キャンセル
              </button>
            )}
          </div>
        </form>
      </section>

      <Timeline
        events={sortedEvents}
        title="Daily Schedule"
        subtitle="Your planned activities for today"
        showFooter={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
