import DolbomMain from 'welfare/component/DolbomMain';
import WelfareAddressModal from 'welfare/component/WelfareAddressModal';
import WelfareCheckPW from 'welfare/component/WelfareCheckPW';
import WelfareCheckSpec from 'welfare/component/WelfareCheckSpec';
import WelfareHanwoolModal from 'welfare/component/WelfareHanwoolModal';
import WelfareHouseworkModal from 'welfare/component/WelfareHouseworkModal';
import WelfareInputAddress from 'welfare/component/WelfareInputAddress';
import WelfareInputBirth from 'welfare/component/WelfareInputBirth';
import WelfareInputDisease from 'welfare/component/WelfareInputDisease';
import WelfareInputGender from 'welfare/component/WelfareInputGender';
import WelfareInputHeight from 'welfare/component/WelfareInputHeight';
import WelfareList from 'welfare/component/WelfareList';
import WelfareMain from 'welfare/component/WelfareMain';
import WelfareNursingModal from 'welfare/component/WelfareNursingModal';
import WelfareReserveCancelModal from 'welfare/component/WelfareReserveCancelModal';
import WelfareReservedList from 'welfare/component/WelfareReservedList';
import WelfareSetPW from 'welfare/component/WelfareSetPW';

import ConsumeReport from 'consumeReport/component/ConsumeReport';

import { Route, Routes } from 'react-router-dom';

import Modal from 'react-modal';
import WelfareInputTotal from 'welfare/component/WelfareInputTotal';
import WelfarePayComplete from 'welfare/component/WelfarePayCompl';

import 'index.css';
import PrivateRoute from 'PrivateRoute';
import WelfarePay from 'welfare/component/WelfarePay';

Modal.setAppElement('#root');

function App(props) {
  return (
    <Routes>
      
      
      <Route path="/welfare-list" element={<PrivateRoute><WelfareList /></PrivateRoute>} />
      <Route path="/welfare-main" element={<PrivateRoute><WelfareMain /></PrivateRoute>} />
      
      
      <Route path="/welfare-reserved-list/*" element={<PrivateRoute><WelfareReservedList /></PrivateRoute>} >
        <Route path="welfare-reserve-cancelmodal" element={<PrivateRoute><WelfareReserveCancelModal /></PrivateRoute>} />
      </Route>
      
      <Route path="/welfare-set-pw" element={<PrivateRoute><WelfareSetPW /></PrivateRoute>} />
      
      <Route path="/welfare-input/*" element={<PrivateRoute><WelfareInputTotal /></PrivateRoute>}>
        <Route path="address" element={<PrivateRoute><WelfareInputAddress /></PrivateRoute>} />
        <Route path="address-modal" element={<PrivateRoute><WelfareAddressModal /></PrivateRoute>} />

        <Route path="birth" element={<PrivateRoute><WelfareInputBirth /></PrivateRoute>} />
        <Route path="disease" element={<PrivateRoute><WelfareInputDisease /></PrivateRoute>} />
        <Route path="gender" element={<PrivateRoute><WelfareInputGender /></PrivateRoute>} />
        <Route path="height" element={<PrivateRoute><WelfareInputHeight /></PrivateRoute>} />

        <Route path="check-spec" element={<PrivateRoute><WelfareCheckSpec /></PrivateRoute>} />
        <Route path="pay" element={<PrivateRoute><WelfarePay /></PrivateRoute>} />
        <Route path="welfare-check-pw" element={<PrivateRoute><WelfareCheckPW /></PrivateRoute>} />
        <Route path="paycomplete" element={<PrivateRoute><WelfarePayComplete /></PrivateRoute>} />

        <Route path="dolbom-main" element={<PrivateRoute><DolbomMain /></PrivateRoute>} /> 
        {/* dolbom-main을 통해서 모달을 열기 때문에 dolbom-main 또한 WelfareInputTotal의 자식 요소여야함 */}
        <Route path="nursing-modal" element={<PrivateRoute><WelfareNursingModal /></PrivateRoute>} />
        <Route path="housework-modal" element={<PrivateRoute><WelfareHouseworkModal /></PrivateRoute>} />
        <Route path="hanwool-modal" element={<PrivateRoute><WelfareHanwoolModal /></PrivateRoute>} />
      </Route>
      <Route path="/consume-report" element={<PrivateRoute><ConsumeReport /></PrivateRoute>} />

    </Routes>
  );
}

export default App;
