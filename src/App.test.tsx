import { describe, expect, it } from 'vitest';
import { render, screen, userEvent, within } from '@/test/test-utils';
import App from './App';

describe('App schedule editor', () => {
  it('adds, edits, and deletes schedule events', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('時間'), '07:00-07:30');
    await user.type(screen.getByLabelText('予定'), '朝の読書');
    await user.type(screen.getByLabelText('詳細'), '技術書を読む');
    await user.click(screen.getByRole('button', { name: '予定を追加' }));

    expect(screen.getByText('朝の読書')).toBeInTheDocument();
    expect(screen.getByText('技術書を読む')).toBeInTheDocument();

    const addedEventActions = screen.getByLabelText('朝の読書の操作');
    await user.click(within(addedEventActions).getByRole('button', { name: '編集' }));
    await user.clear(screen.getByLabelText('予定'));
    await user.type(screen.getByLabelText('予定'), '朝の散歩');
    await user.click(screen.getByRole('button', { name: '予定を更新' }));

    expect(screen.getByText('朝の散歩')).toBeInTheDocument();
    expect(screen.queryByText('朝の読書')).not.toBeInTheDocument();

    const updatedEventActions = screen.getByLabelText('朝の散歩の操作');
    await user.click(within(updatedEventActions).getByRole('button', { name: '削除' }));

    expect(screen.queryByText('朝の散歩')).not.toBeInTheDocument();
  });
});
