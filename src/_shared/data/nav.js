// import appNavs from '../../Modules/AppOwner/_nav.app';
// import appRoute from '../../Modules/AppOwner/_routes.app';
//
// import franchiseNavs from '../../Modules/Franchise/_nav.franchise';
// import franchiseRoutes from '../../Modules/Franchise/_routes.franchise';
//
// import superDistributorNavs from '../../Modules/SuperDistributor/_nav.super.distributor';
// import superDistributorRoutes from '../../Modules/SuperDistributor/_routes.super.distributor';
//
// import confirmedDistributorNavs from '../../Modules/ConfirmedDistributor/_nav.confirmed.distributor';
// import confirmedDistributorRoutes from '../../Modules/ConfirmedDistributor/_routes.confirmed.distributor';
//
// import agentNavs from '../../Modules/Agent/_nav.agent';
// import agentRoutes from '../../Modules/Agent/_routes.agent';
//
//
// export default (module, userAccount) => {
//     const getNav = (module, userAccount) => {
//         console.log('module', module);
//         console.log('userAccount', userAccount);
//         const app = appNavs(module);
//         switch (module) {
//             case 'franchise':
//                 // const franchise = franchiseNavs(module, userAccount);
//                 const franchise = superDistributorNavs(module, userAccount);
//                 return {
//                     franchise: {
//                         // navigation: franchise,
//                         // routes: franchiseRoutes,
//                         navigation: franchise,
//                         routes: superDistributorRoutes,
//                     },
//                 };
//             case 'distributor':
//                 const superDistributor = superDistributorNavs(module, userAccount);
//                 return {
//                     'distributor': {
//                         navigation: superDistributor,
//                         routes: superDistributorRoutes,
//                     },
//                 };
//             case 'agent':
//                 const agent = superDistributorNavs(module, userAccount);
//                 return {
//                     agent: {
//                         navigation: agent,
//                         routes: superDistributorRoutes,
//                     },
//                 };
//             // const agent = agentNavs(module, userAccount);
//             // return {
//             //     agent: {
//             //         navigation: agent,
//             //         routes: agentRoutes,
//             //     },
//             // };
//             default:
//                 return {
//                     app: {
//                         navigation: app,
//                         routes: appRoute,
//                     },
//                 };
//         }
//     };
//     console.log('nav:', getNav(module, userAccount));
//     return getNav(module, userAccount);
// };
