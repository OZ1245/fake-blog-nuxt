/**
 * Обрезка текста на указанное количество символов
 *
 * @param  {string}  text  Исходный текст
 * @param  {number}  size  Количество символов
 * @param  {string}  add   Строка, которую нужно добавить к новой получившейся строке
 *
 * @returns Новая строка
 */
export const truncateText = (
  text: string,
  size: number = 80,
  add: string = '...'
): string => {
  if (text.length > size) {
    const lastSpaceIndex: number = text.substring(0, size).lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
      return text.substring(0, lastSpaceIndex) + add;
    }

    return text.substring(0, size) + add;
  }

  return text;
};
