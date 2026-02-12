# Daily Schedule Timeline Web App

A beautiful, responsive vertical timeline component built with React 19, TypeScript, and Vite 6. Perfect for displaying daily schedules, event chronologies, or any time-based sequential data.

![Daily Schedule Timeline](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-6.3-646cff)

## Features

- 🎨 **Beautiful Design**: Alternating blue (#00a8cc) and red (#e60000) nodes with a central vertical line
- 📱 **Fully Responsive**: Optimized layouts for mobile, tablet, and desktop
- ♿ **Accessible**: Semantic HTML with ARIA labels
- 🎯 **TypeScript**: Full type safety with comprehensive type definitions
- ⚡ **Fast**: Built with Vite 6 + React SWC for lightning-fast development
- 🧪 **Well-Tested**: Vitest + React Testing Library setup ready
- 🎭 **CSS Modules**: Scoped styling without runtime overhead

## Design Inspiration

The timeline design is inspired by vertical history timelines, featuring:
- Central black vertical line
- Alternating blue/red circular nodes
- Content positioned on alternating sides (blue → right, red → left)
- Clean typography with proper visual hierarchy

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd schedule-timeline

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Usage

### Basic Timeline

```tsx
import { Timeline } from '@/components/timeline';
import type { ScheduleEvent } from '@/types/schedule.types';

const events: ScheduleEvent[] = [
  {
    id: '1',
    time: '08:00-09:00',
    title: 'Morning Exercise',
    description: 'Cardio and strength training',
    category: 'exercise'
  },
  {
    id: '2',
    time: '09:30-10:30',
    title: 'Team Meeting',
    description: 'Daily sync with the team',
    category: 'meeting'
  }
];

function App() {
  return (
    <Timeline
      events={events}
      title="Daily Schedule"
      subtitle="Your activities for today"
      showFooter={true}
    />
  );
}
```

### Custom Components

```tsx
import { TimelineNode, TimelineContent, TimelineItem } from '@/components/timeline';

function CustomItem() {
  return (
    <TimelineItem
      event={eventData}
      nodeColor="blue"
      position="right"
    />
  );
}
```

### Using the Layout Hook

```tsx
import { useTimelineLayout } from '@/hooks/useTimelineLayout';

function CustomTimeline({ events }: { events: ScheduleEvent[] }) {
  const { layouts, getNodeColor } = useTimelineLayout(events);

  return (
    <div>
      {layouts.map((layout, index) => (
        <div key={layout.event.id}>
          Node color: {getNodeColor(index)}
        </div>
      ))}
    </div>
  );
}
```

## API Reference

### Timeline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `ScheduleEvent[]` | *required* | Array of events to display |
| `title` | `string` | `undefined` | Main title for the timeline |
| `subtitle` | `string` | `undefined` | Optional subtitle |
| `showFooter` | `boolean` | `false` | Show footer section |

### ScheduleEvent Type

```typescript
interface ScheduleEvent {
  id: string;              // Unique identifier
  time: TimeSlot;          // "HH:MM-HH:MM" or "HH:MM"
  title: string;           // Event title
  description?: string;    // Optional description
  category?: EventCategory; // Optional category
}
```

### Event Categories

- `work` - Work-related tasks
- `personal` - Personal activities
- `meeting` - Meetings and calls
- `break` - Breaks and rest time
- `exercise` - Physical activities
- `other` - Other events

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Generate test coverage report |

## Project Structure

```
schedule-timeline/
├── src/
│   ├── components/
│   │   ├── timeline/          # Timeline components
│   │   │   ├── Timeline.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   ├── TimelineNode.tsx
│   │   │   ├── TimelineContent.tsx
│   │   │   ├── TimelineHeader.tsx
│   │   │   ├── TimelineFooter.tsx
│   │   │   └── Timeline.module.css
│   │   └── ui/               # UI components
│   │       └── Icon.tsx
│   ├── hooks/
│   │   └── useTimelineLayout.ts
│   ├── types/
│   │   └── schedule.types.ts
│   ├── utils/
│   │   ├── time.utils.ts
│   │   └── constants.ts
│   ├── data/
│   │   └── mockEvents.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── test/
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Time Utilities

The app includes utility functions for time manipulation:

```typescript
import { formatTime, parseTimeSlot, getDurationMinutes, isValidTimeSlot } from '@/utils/time.utils';

// Format time for display
formatTime("08:00-09:00"); // "8:00 AM - 9:00 AM"

// Parse time slot
parseTimeSlot("08:00-09:00");
// { startTime: "08:00", endTime: "09:00", startHour: 8, ... }

// Get duration
getDurationMinutes("08:00-09:30"); // 90 (minutes)

// Validate format
isValidTimeSlot("08:00-09:00"); // true
```

## Responsive Breakpoints

- **Desktop**: > 768px - Two-sided layout with alternating nodes
- **Tablet**: 481px - 768px - Adjusted spacing
- **Mobile**: ≤ 480px - Single-sided layout with line on left

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test-related changes
- `chore:` - Build process or tooling changes

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Future Enhancements

- [ ] Drag and drop event reordering
- [ ] Form for adding/editing/deleting events
- [ ] LocalStorage persistence
- [ ] PDF/Image export
- [ ] Category-based color coding
- [ ] Search and filtering
- [ ] Dark mode toggle
- [ ] Multiple view modes (daily/weekly/monthly)
- [ ] Internationalization (i18n)
- [ ] Calendar integration

## Acknowledgments

Design inspired by vertical timeline patterns commonly used in history and portfolio websites.
