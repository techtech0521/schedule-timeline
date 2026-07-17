import { useMemo, useRef, useState, type FormEvent } from 'react';
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
  const editorRef = useRef<HTMLElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const isEditing = editingId !== null;

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.time.localeCompare(b.time, 'ja'));
  }, [events]);

  const editingEvent = useMemo(() => {
    return events.find((event) => event.id === editingId) ?? null;
  }, [editingId, events]);

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

  const focusEditor = () => {
    if (editorRef.current?.scrollIntoView) {
      editorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.requestAnimationFrame(() => timeInputRef.current?.focus());
  };

  const handleEdit = (event: ScheduleEvent) => {
    setEditingId(event.id);
    setFormError(null);
    setForm({
      time: event.time,
      title: event.title,
      description: event.description ?? '',
    });
    focusEditor();
  };

  const handleDelete = (id: string) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="container">
      <div className="planner-workspace">
        <section
          ref={editorRef}
          className="schedule-editor"
          aria-labelledby="schedule-editor-title"
        >
          <div className="editor-header">
            <p className="editor-kicker">Schedule Editor</p>
            <h1 id="schedule-editor-title">予定を管理</h1>
            <p>左のフォームで追加・修正し、右のタイムラインで対象の予定をすぐ確認できます。</p>
          </div>

          <div className={isEditing ? 'editor-mode editing' : 'editor-mode'} aria-live="polite">
            <span>{isEditing ? '編集中' : '新規追加'}</span>
            <strong>
              {editingEvent ? `${editingEvent.time} ${editingEvent.title}` : '新しい予定'}
            </strong>
          </div>

          <form className="schedule-form" onSubmit={handleSubmit} noValidate>
            <label className="form-field">
              <span>時間</span>
              <input
                ref={timeInputRef}
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

        <div className="timeline-panel">
          <Timeline
            events={sortedEvents}
            title="Daily Schedule"
            subtitle="右側の予定カードから編集対象を選べます"
            showFooter={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            activeEventId={editingId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
