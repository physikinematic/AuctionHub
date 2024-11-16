import { Test } from '@nestjs/testing';
import { Account } from './account.schema';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  const mockAccounts: Account[] = [];

  beforeEach(async () => {
    const mockRepository = {
      count: (options: { where: Partial<Account> }) => {
        const count = mockAccounts.filter((account) =>
          Object.entries(options.where).every(
            ([key, value]) => account[key] === value,
          ),
        ).length;
        return Promise.resolve(count);
      },
      find: (o: {
        where?: Partial<Account>;
        skip?: number;
        take?: number;
        select?: Partial<Account>;
      }) => {
        let accounts = mockAccounts.filter((account) =>
          Object.entries(o.where || {}).every(
            ([key, value]) => account[key] === value,
          ),
        );

        if (o.skip !== undefined) {
          accounts = accounts.slice(o.skip);
        }

        if (o.take !== undefined) {
          accounts = accounts.slice(0, o.take);
        }

        accounts = accounts.map((account) => {
          const selectedAccount: Partial<Account> = {};
          if (o.select) {
            Object.keys(o.select).forEach((key) => {
              if (key in account) {
                selectedAccount[key] = account[key];
              }
            });
          } else {
            Object.assign(selectedAccount, account);
          }
          return selectedAccount as Account;
        });

        return Promise.resolve(accounts);
      },
      findOne: (o: { where?: Partial<Account>; select?: Partial<Account> }) => {
        const account = mockAccounts.find((account) =>
          Object.entries(o.where || {}).every(
            ([key, value]) => account[key] === value,
          ),
        );
        return Promise.resolve(account);
      },
      save: (account: Account) => {
        mockAccounts.push(account);
        return Promise.resolve(account);
      },
      remove: (account: Account) => {
        const index = mockAccounts.indexOf(account);
        mockAccounts.splice(index, 1);
        return Promise.resolve();
      },
    };

    const module = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get(AccountService);
  });

  /// General
  it('can create an instance of account service', async () => {
    expect(service).toBeDefined();
  });
  /// End General
});
