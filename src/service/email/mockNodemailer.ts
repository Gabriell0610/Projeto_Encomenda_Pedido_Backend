import { IEmailService } from "./nodemailer.type";

class MockEmailService implements IEmailService {
  sendEmail = jest.fn();
}

export { MockEmailService };
