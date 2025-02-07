/***
 *  Вся техника делится на группы.
 *  Каждая группа делиться на типы.
 *  Группы и типы указываются отдельными полями в JSON или БД
 *  И группы и типы могут пополняться
 */

/***
 * Группы техники
 */

export const ARMOR = 'ARMOR'; // Бронетехника
export const AIRCRAFT = 'AIRCRAFT'; //Авиация
export const NAVAL = 'NAVAL'; // Флот
export const MISSILE = 'MISSILE'; // Ракетное вооружение

/***
 * Типы техники
 */

// Типы группы ARMOR
export const BBM = 'BBM'; // Бронемашины
export const TANK = 'TANK'; // Танки
export const SAU = 'SAU'; // Самоходные орудия
export const ACV = 'ACV'; // БТР, БМП
export const MLRS = 'MLRS'; // Системы РСЗО

// Типы группы Авиация

export const FIGHTER = 'FIGHTER'; // Истребители
export const STURM = 'STURM'; // Штурмовики
export const BOMBER = 'BOMBER'; // Бомбардировщики
export const SUPPORT_PLANE = 'SUPPORT_PLANE'; // Вспомогательные самолеты
export const ATTACK_HELICOPTER = 'ATTACK_HELICOPTER'; // Ударные вертолеты
export const SUPPORT_HELICOPTER = 'SUPPORT_HELICOPTER'; // Вспомогательные вертолеты
export const DRONE = 'DRONE'; // Беспилотные аппараты
