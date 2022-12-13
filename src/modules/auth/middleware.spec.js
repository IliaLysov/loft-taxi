import { authMiddleware } from "./middleware"
import {authentificate} from "./actions"
import {serverLogin} from "../../api"

jest.mock("../../api", () => ({serverLogin: jest.fn(() => true)}))

describe("authMiddleware", () => {
    afterAll(jest.clearAllMocks)
  
    describe("#AUTHENTICATE", () => {
      describe("with correct credentials", () => {
        it("authenticates through api", async () => {
          serverLogin.mockImplementation(async () => true);
          const dispatch = jest.fn();
  
          await authMiddleware({ dispatch })()(
            authentificate("testlogin", "testpassword")
          );
          expect(serverLogin).toBeCalledWith("testlogin", "testpassword");
          expect(dispatch).toBeCalledWith({
            type: "LOG_IN",
          });
        });
      });
      describe("with wrong credentials", () => {
        it("authenticates through api", async () => {
            serverLogin.mockImplementation(() => false);
          const dispatch = jest.fn();
  
          await authMiddleware({ dispatch })()(
            authentificate("testlogin", "testpassword")
          );
          expect(dispatch).not.toBeCalled();
        });
      });
    });
  });