import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Map.jsx";
import Hospital from "views/Hospital.jsx";
import NewDoctor from './views/NewDoctor';
import NewPatient from './views/NewPatient';
import NewPharmacist from './views/NewPharmacist';
import NewHospital from './views/NewHospital';
import { NewStaffMember } from "views/NewStaffMember";
import LoginToPatient from './views/doctor/LoginToPatient';
import AddPrescription from './views/doctor/AddPrescription';
import MyPrescriptions from './views/doctor/MyPrescriptions';
import UpdatePresciption from './views/doctor/UpdatePrescription';
import PatientPrescription from './views/patient/MyPrescriptions';
import ViewPrescription from './views/pharnacist/ViewPrescriptions';
import GetPatientById from './views/pharnacist/GetPatient';
export const routes = [
  {
    path: "/dashboard/:pageNo",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    visible: true
  },
  {
    path: "/patients/:pageNo",
    name: "Bệnh nhân",
    icon: "fas fa-procedures",
    component: Icons,
    layout: "/admin",
    visible: true
  },
  {
    path: "/pharmacist/:pageNo",
    name: "Chuyên Khoa",
    icon: "fas fa-pills",
    component: Maps,
    layout: "/admin",
    visible: true
  },
  {
    path: "/staff-members/:pageNo",
    name: "Nhân Viên",
    icon: "fas fa-user-alt",
    component: Notifications,
    layout: "/admin",
    visible: true
  },
  {
    path: "/hospital/:pageNo",
    name: "Bệnh Viện",
    icon: "fas fa-hospital",
    component: Hospital,
    layout: "/admin",
    visible: true
  },
  {
    path: "/new-doctor",
    component: NewDoctor,
    layout: "/admin",
    visible : false
  },
  {
    path: '/new-patient',
    component: NewPatient,
    layout: '/admin',
    visible : false
  },
  {
    path: '/new-pharmacist',
    component: NewPharmacist,
    layout: '/admin',
    visible : false
  },
  {
    path: '/new-staff-member',
    component: NewStaffMember,
    layout: '/admin',
    visible: false
  },
  {
    path: '/new-hospital',
    component: NewHospital,
    layout: '/admin',
    visible: false
  }
];

export const doctorRoutes = [
  {
    path: '/add-prescription',
    component: AddPrescription,
    visible: true,
    layout: '/doctor',
    name: 'Thêm đơn thuốc',
    icon: 'fas fa-file-medical'
  },
  {
    path: '/my-prescriptions',
    component: MyPrescriptions,
    visible: true,
    layout: '/doctor',
    name: 'Đơn thuốc của tôi',
    icon: 'fas fa-th-list'
  },
  {
    path: '/update-prescription/:prescriptionId',
    component: UpdatePresciption,
    visible: false,
    layout: '/doctor',
    name: 'Đơn thuốc của tôi',
    icon: 'fas fa-th-list'
  },
];

export const pharmacistRoutes = [
  {
    path: '/prescription',
    component: ViewPrescription,
    visible: true,
    layout: '/pharmacist',
    name: 'Đơn thuốc của tôi',
    icon: 'fas fa-th-list'
  },
]

export const patientRoutes = [
  {
    path: '/my-prescriptions/:pageNo',
    component: PatientPrescription,
    visible: true,
    layout: '/patient',
    name: 'Đơn thuốc của tôi',
    icon: 'fas fa-th-list'
  },
]

export const doctorPatientRoutes = [
  {
    path: '/add-prescription',
    component: AddPrescription,
    visible: true,
    layout: '/patient',
    name: 'Thêm đơn thuốc',
    icon: 'fas fa-user-alt'
  }
]

export const loginToPatient = {
  path: "/login-to-patient/",
  component: LoginToPatient,
  visible: false
}

export const getPatientById = {
  path: "/get-patient-by-id/",
  component: GetPatientById,
  visible: false
}


// export default routes;
