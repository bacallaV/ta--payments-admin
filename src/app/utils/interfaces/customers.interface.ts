export interface ICustomer {
  id: string,
  name: string,
  lastname: string,
  dateOfBirth: Date,
}

export interface ICreateCustomerDto extends Omit<ICustomer, 'id'> {}
export interface IEditCustomerDto extends Partial<ICreateCustomerDto> {}
