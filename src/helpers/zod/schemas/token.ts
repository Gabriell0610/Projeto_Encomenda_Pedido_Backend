import { AccessProfile } from "@/constants/access-profile";
import { z } from "zod";

const access_token = z.string().trim();

const requesterEmail = z.string().email().trim();
const requesterId = z.string();

const requesterRole = z.nativeEnum(AccessProfile);

const authorizationBodySchema = z.object({
  access_token,
  requesterEmail,
  requesterId,
  requesterRole,
});

type AuthorizationBodyDto = z.infer<typeof authorizationBodySchema>;

export { authorizationBodySchema, AuthorizationBodyDto };
