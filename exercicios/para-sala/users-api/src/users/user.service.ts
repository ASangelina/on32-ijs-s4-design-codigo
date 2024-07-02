import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  REGEX_EMAIL_VALID = '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
  REGEX_PASSWORD_VALID =
    '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/';
  EMAIL_ERROR_MESSAGE = 'Invalid email';
  PASSWORD__ERROR_MESSAGE = 'Invalid password';

  verifyRegex(regexString: string, value: string): boolean {
    // Use o método test da RegExp
    const regex = new RegExp(regexString);
    return !regex.test(value);
  }

  createUser(user: User): User {
    // valida user data

    if (this.verifyRegex(this.REGEX_EMAIL_VALID, user.email)) {
      throw new Error(this.EMAIL_ERROR_MESSAGE);
    } else {
      if (this.verifyRegex(this.REGEX_PASSWORD_VALID, user.password))
        {
        throw new Error('Invalid password');
      } else {
        if (
          user.superPassword &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            user.superPassword,
          )
        ) {
          throw new Error(this.PASSWORD__ERROR_MESSAGE);
        } else {
          if (this.users.some((iUser) => iUser.email === user.email)) {
            throw new Error('Email already in use');
          } else {
            if (this.users.some((iUser) => iUser.cpf === user.cpf)) {
              throw new Error('CPF already in use');
            } else {
              if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(user.cpf)) {
                throw new Error('Invalid CPF');
              } else {
                const cpfWithoutDots = user.cpf.replace(/[^\d]+/g, '');
                if (cpfWithoutDots.length !== 11) {
                  throw new Error('Invalid CPF');
                } else {
                  // Elimina CPFs conhecidos que são inválidos
                  if (
                    cpfWithoutDots === '00000000000' ||
                    cpfWithoutDots === '11111111111' ||
                    cpfWithoutDots === '22222222222' ||
                    cpfWithoutDots === '33333333333' ||
                    cpfWithoutDots === '44444444444' ||
                    cpfWithoutDots === '55555555555' ||
                    cpfWithoutDots === '66666666666' ||
                    cpfWithoutDots === '77777777777' ||
                    cpfWithoutDots === '88888888888' ||
                    cpfWithoutDots === '99999999999'
                  ) {
                    throw new Error('Invalid CPF');
                  }

                  let sum = 0;
                  let remainder;

                  // Calcula o primeiro dígito verificador
                  for (let i = 1; i <= 9; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
                    throw new Error('Invalid CPF');
                  }

                  sum = 0;

                  // Calcula o segundo dígito verificador
                  for (let i = 1; i <= 10; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (
                    remainder !== parseInt(cpfWithoutDots.substring(10, 11))
                  ) {
                    throw new Error('Invalid CPF');
                  }
                }
              }
            }
          }
        }
      }
    }
    const userCode = `${Date.now().toString()}${this.users.length}`;
    user.id = userCode;
    user.employeeCode = `${this.users.length + 1}`;
    this.users.push(user);
    return user;
  }
  createUserOld(
    name: string,
    email: string,
    password: string,
    cpf: string,
    userType: 'customer' | 'manager' | 'admin',
    superPassword?: string,
  ): User {
    // valida user data
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email');
    } else {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password,
        )
      ) {
        throw new Error('Invalid password');
      } else {
        if (
          superPassword &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            superPassword,
          )
        ) {
          throw new Error('Invalid super password');
        } else {
          if (this.users.some((user) => user.email === email)) {
            throw new Error('Email already in use');
          } else {
            if (this.users.some((user) => user.cpf === cpf)) {
              throw new Error('CPF already in use');
            } else {
              if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
                throw new Error('Invalid CPF');
              } else {
                const cpfWithoutDots = cpf.replace(/[^\d]+/g, '');
                if (cpfWithoutDots.length !== 11) {
                  throw new Error('Invalid CPF');
                } else {
                  // Elimina CPFs conhecidos que são inválidos
                  if (
                    cpfWithoutDots === '00000000000' ||
                    cpfWithoutDots === '11111111111' ||
                    cpfWithoutDots === '22222222222' ||
                    cpfWithoutDots === '33333333333' ||
                    cpfWithoutDots === '44444444444' ||
                    cpfWithoutDots === '55555555555' ||
                    cpfWithoutDots === '66666666666' ||
                    cpfWithoutDots === '77777777777' ||
                    cpfWithoutDots === '88888888888' ||
                    cpfWithoutDots === '99999999999'
                  ) {
                    throw new Error('Invalid CPF');
                  }

                  let sum = 0;
                  let remainder;

                  // Calcula o primeiro dígito verificador
                  for (let i = 1; i <= 9; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
                    throw new Error('Invalid CPF');
                  }

                  sum = 0;

                  // Calcula o segundo dígito verificador
                  for (let i = 1; i <= 10; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (
                    remainder !== parseInt(cpfWithoutDots.substring(10, 11))
                  ) {
                    throw new Error('Invalid CPF');
                  }
                }
              }
            }
          }
        }
      }
    }

    const userCode = `${Date.now().toString()}${this.users.length}`;
    const user = new User(
      name,
      email,
      password,
      cpf,
      userType,
      userCode,
      `${this.users.length + 1}`,
      superPassword,
    );
    this.users.push(user);
    return user;
  }

  updateUser(updatedUser: User): User {
    // valida user data
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedUser.email)) {
      throw new Error('Invalid email');
    } else {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          updatedUser.password,
        )
      ) {
        throw new Error('Invalid password');
      } else {
        if (
          updatedUser.superPassword &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            updatedUser.superPassword,
          )
        ) {
          throw new Error('Invalid super password');
        } else {
          if (
            this.users.some(
              (iUser) =>
                iUser.email === updatedUser.email &&
                iUser.id !== updatedUser.id,
            )
          ) {
            throw new Error('Email already in use');
          } else {
            if (
              this.users.some(
                (iUser) =>
                  iUser.cpf === updatedUser.cpf && iUser.id !== updatedUser.id,
              )
            ) {
              throw new Error('CPF already in use');
            } else {
              if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(updatedUser.cpf)) {
                throw new Error('Invalid CPF');
              } else {
                const cpfWithoutDots = updatedUser.cpf.replace(/[^\d]+/g, '');
                if (cpfWithoutDots.length !== 11) {
                  throw new Error('Invalid CPF');
                } else {
                  // Elimina CPFs conhecidos que são inválidos
                  if (
                    cpfWithoutDots === '00000000000' ||
                    cpfWithoutDots === '11111111111' ||
                    cpfWithoutDots === '22222222222' ||
                    cpfWithoutDots === '33333333333' ||
                    cpfWithoutDots === '44444444444' ||
                    cpfWithoutDots === '55555555555' ||
                    cpfWithoutDots === '66666666666' ||
                    cpfWithoutDots === '77777777777' ||
                    cpfWithoutDots === '88888888888' ||
                    cpfWithoutDots === '99999999999'
                  ) {
                    throw new Error('Invalid CPF');
                  }

                  let sum = 0;
                  let remainder;

                  // Calcula o primeiro dígito verificador
                  for (let i = 1; i <= 9; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
                    throw new Error('Invalid CPF');
                  }

                  sum = 0;

                  // Calcula o segundo dígito verificador
                  for (let i = 1; i <= 10; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (
                    remainder !== parseInt(cpfWithoutDots.substring(10, 11))
                  ) {
                    throw new Error('Invalid CPF');
                  }
                }
              }
            }
          }
        }
      }
    }

    const userToUpdate = this.users.find(
      (iUser) => iUser.id === updatedUser.id,
    );

    if (userToUpdate) {
      userToUpdate.name = updatedUser.name;
      userToUpdate.email = updatedUser.email;
      userToUpdate.password = updatedUser.password;
      userToUpdate.cpf = updatedUser.cpf;
      userToUpdate.userType = updatedUser.userType;

      if (updatedUser.superPassword) {
        userToUpdate.superPassword = updatedUser.superPassword;
      }
    }
    if (!userToUpdate) {
      throw new Error('User not found');
    }

    return userToUpdate;
  }

  updateUserOld(
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string,
    userType: 'customer' | 'manager' | 'admin',
    superPassword?: string,
  ): User {
    // valida user data
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email');
    } else {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password,
        )
      ) {
        throw new Error('Invalid password');
      } else {
        if (
          superPassword &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            superPassword,
          )
        ) {
          throw new Error('Invalid super password');
        } else {
          if (this.users.some((user) => user.email === email)) {
            throw new Error('Email already in use');
          } else {
            if (this.users.some((user) => user.cpf === cpf)) {
              throw new Error('CPF already in use');
            } else {
              if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
                throw new Error('Invalid CPF');
              } else {
                const cpfWithoutDots = cpf.replace(/[^\d]+/g, '');
                if (cpfWithoutDots.length !== 11) {
                  throw new Error('Invalid CPF');
                } else {
                  // Elimina CPFs conhecidos que são inválidos
                  if (
                    cpfWithoutDots === '00000000000' ||
                    cpfWithoutDots === '11111111111' ||
                    cpfWithoutDots === '22222222222' ||
                    cpfWithoutDots === '33333333333' ||
                    cpfWithoutDots === '44444444444' ||
                    cpfWithoutDots === '55555555555' ||
                    cpfWithoutDots === '66666666666' ||
                    cpfWithoutDots === '77777777777' ||
                    cpfWithoutDots === '88888888888' ||
                    cpfWithoutDots === '99999999999'
                  ) {
                    throw new Error('Invalid CPF');
                  }

                  let sum = 0;
                  let remainder;

                  // Calcula o primeiro dígito verificador
                  for (let i = 1; i <= 9; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
                    throw new Error('Invalid CPF');
                  }

                  sum = 0;

                  // Calcula o segundo dígito verificador
                  for (let i = 1; i <= 10; i++) {
                    sum +=
                      parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
                  }

                  remainder = (sum * 10) % 11;

                  if (remainder === 10 || remainder === 11) {
                    remainder = 0;
                  }

                  if (
                    remainder !== parseInt(cpfWithoutDots.substring(10, 11))
                  ) {
                    throw new Error('Invalid CPF');
                  }
                }
              }
            }
          }
        }
      }
    }

    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.cpf = cpf;
      user.userType = userType;

      if (superPassword) {
        user.superPassword = superPassword;
      }
    }

    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  listUsers(): User[] {
    return this.users;
  }
}
