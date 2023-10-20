interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

//Ineyeccion de dependencia, que quiero hacer en caso de que el check sea exitoso o falle
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) {}

	public async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);
			if (!req.ok) {
				throw new Error(`Error on check service: ${url}`);
			}

			this.successCallback();
			console.log(`${url} is Ok!`);

			return true;
		} catch (error) {
			this.errorCallback(`${error}`);
			console.log(`${error}`);

			return false;
		}
	}
}
