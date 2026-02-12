import { describe, it, expect } from 'vitest';
import { render } from '@/test/test-utils';
import { TimelineNode } from './TimelineNode';

describe('TimelineNode Component', () => {
  it('renders blue node', () => {
    const { container } = render(<TimelineNode color="blue" />);
    const node = container.querySelector('[class*="node"]');
    expect(node).toBeInTheDocument();
    expect(node?.className).toContain('blue');
  });

  it('renders red node', () => {
    const { container } = render(<TimelineNode color="red" />);
    const node = container.querySelector('[class*="node"]');
    expect(node).toBeInTheDocument();
    expect(node?.className).toContain('red');
  });

  it('renders node with custom size', () => {
    const { container } = render(<TimelineNode color="blue" size={30} />);
    const node = container.querySelector('[class*="node"]');
    expect(node).toBeInTheDocument();
    expect(node).toHaveStyle({ width: '30px', height: '30px' });
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<TimelineNode color="blue" />);
    const node = container.querySelector('[class*="node"]');
    expect(node).toHaveAttribute('aria-hidden', 'true');
  });
});
