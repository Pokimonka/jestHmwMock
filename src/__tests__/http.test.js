import getLevel from '../getLevel';
import fetchData  from '../http';


jest.mock('../http');


test('should call fetchData once', () => {
    fetchData.mockReturnValue({status: 'ok', level: 5});
    let result = getLevel(1);
    expect(result).toBe('Ваш текущий уровень: 5');
    expect(fetchData).toHaveBeenCalledWith('https://server/user/1')
});


test('Return error message', () => {
  fetchData.mockReturnValue({status: 'error'});

  const result = getLevel(1);

  expect(result).toBe('Информация об уровне временно недоступна');
});


test('fetchData errors', () => {
  fetchData.mockImplementation(() => {
    throw new Error('Mock this!');
  });

  const result = getLevel(1);

  expect(result).toBe('Информация об уровне временно недоступна');
});