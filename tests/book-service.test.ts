import type { SupabaseClient } from '@supabase/supabase-js';
import { fetchRecentBooks } from '@/services/book-service';
import { getSupabaseClient, getSupabaseClientStatus } from '@/services/supabase-service';

jest.mock('@/services/supabase-service');

describe('fetchRecentBooks', () => {
  const mockedGetStatus = getSupabaseClientStatus as jest.Mock;
  const mockedGetClient = getSupabaseClient as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns fallback data when env is missing', async () => {
    mockedGetStatus.mockReturnValue('missing-env');

    const result = await fetchRecentBooks({ limit: 1 });

    expect(result.source).toBe('fallback');
    expect(result.items).toHaveLength(1);
    expect(mockedGetClient).not.toHaveBeenCalled();
  });

  it('returns supabase data when query succeeds', async () => {
    mockedGetStatus.mockReturnValue('ready');

    const mockLimit = jest.fn().mockResolvedValue({
      data: [
        {
          id: 'book-id',
          user_id: 'user-id',
          title: 'Test Book',
          author: 'Tester',
          summary: null,
          published_at: '2024-01-01',
          created_at: '2024-01-02T00:00:00Z'
        }
      ],
      error: null
    });
    const mockOrder = jest.fn().mockReturnValue({ limit: mockLimit });
    const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
    const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });
    const mockClient = { from: mockFrom } as unknown as SupabaseClient;

    mockedGetClient.mockReturnValue(mockClient);

    const result = await fetchRecentBooks({ limit: 3 });

    expect(mockFrom).toHaveBeenCalledWith('books');
    expect(mockSelect).toHaveBeenCalled();
    expect(mockOrder).toHaveBeenCalled();
    expect(mockLimit).toHaveBeenCalledWith(3);
    expect(result.source).toBe('supabase');
    expect(result.items[0]).toMatchObject({
      id: 'book-id',
      userId: 'user-id',
      title: 'Test Book'
    });
  });

  it('falls back when supabase returns an error', async () => {
    mockedGetStatus.mockReturnValue('ready');

    const mockLimit = jest.fn().mockResolvedValue({ data: null, error: { message: 'boom' } });
    const mockOrder = jest.fn().mockReturnValue({ limit: mockLimit });
    const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
    const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });
    const mockClient = { from: mockFrom } as unknown as SupabaseClient;

    mockedGetClient.mockReturnValue(mockClient);

    const result = await fetchRecentBooks({ limit: 2 });

    expect(result.source).toBe('fallback');
    expect(result.items).toHaveLength(2);
    expect(result.error?.message).toBe('boom');
  });
});
