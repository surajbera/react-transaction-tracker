/* auth */
import { useSignup } from './auth/useSignup'
import { useAuthContext } from './auth/useAuthContext'
import { useLogout } from './auth/useLogout'
import { useLogin } from './auth/useLogin'

/* cloud firestore */
import { useAddDoc } from './cloud-firestore/useAddDoc'
import { useDeleteDoc } from './cloud-firestore/useDeleteDoc'
import { useRealtimeDocs } from './cloud-firestore/useRealtimeDocs'
import { useRealtimeFilteredDocs } from './cloud-firestore/useRealtimeFilteredDocs'

/* utilities */
import { customDelay } from './utilities/customDelay'
import { customConsoleLog } from './utilities/customConsoleLog'

export {
  useSignup,
  customConsoleLog,
  useAuthContext,
  useLogout,
  useLogin,
  useAddDoc,
  customDelay,
  useDeleteDoc,
  useRealtimeDocs,
  useRealtimeFilteredDocs,
}
