
import IBitacora from './IBitacora';
import Usuario from './IUsuario';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      usuario: Usuario,
      bitacora: IBitacora
    }
  }
}