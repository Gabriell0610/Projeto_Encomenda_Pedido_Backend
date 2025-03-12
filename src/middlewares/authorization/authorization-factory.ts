import { AccessProfile } from "@/constants/access-profile";
import { Authorization } from "./authorization";

class AuthorizationFactory {
  instances: Authorization[] = [];

  private createInstance(instanceName: string): Authorization {
    return new Authorization(instanceName);
  }

  private getInstance(instanceName: string): Authorization {
    let instance = this.instances.find((instance) => instance.instanceName === instanceName);
    console.log("Instâncias armazenadas:", this.instances);
    console.log("Buscando instância:", instanceName);
    console.log("Instância encontrada:", instance);

    if (!instance) {
      instance = this.createInstance(instanceName);
      this.instances.push(instance);
      console.log("Nova instância criada:", instance);
    }

    return instance;
  }

  ofRoles = (roles: AccessProfile[]): Authorization => {
    console.log(roles);
    const formartInstanceName = roles.sort().join("-");
    console.log(formartInstanceName);
    return this.getInstance(formartInstanceName).ofRoles(roles);
  };

  anyRole = (): Authorization => {
    return this.getInstance("any-roles-instance").anyRole();
  };
}

export { AuthorizationFactory };
