import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'bod',
    loadChildren: () => import('./bod/bod.module').then( m => m.BodPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'products/detail/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'confirmation/:id',
    loadChildren: () => import('./confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'my-account',
    children: [
      {
        path: 'my-store',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/my-store/my-store.module').then( m => m.MyStorePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/profile/profile.module').then( m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/order/order.module').then( m => m.OrderPageModule)
          }
        ]
      },
      {
        path: 'farm',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/farm/farm.module').then( m => m.FarmPageModule)
          }
        ]
      },
      {
        path: 'vehicle',
        children: [
          {
            path: '',
              loadChildren: () => import('./my-account/vehicle/vehicle.module').then( m => m.VehiclePageModule)
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/user/user.module').then( m => m.UserPageModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/chat/chat.module').then( m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'chat/detail/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-account/chat/chat.module').then( m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'deliver-address',
        loadChildren: () => import('./my-account/deliver-address/deliver-address.module').then( m => m.DeliverAddressPageModule)
      },
      {
        path: 'shipping-config',
        loadChildren: () => import('./my-account/shipping/shipping.module').then( m => m.ShippingPageModule)
      },
      {
        path: '',
        redirectTo: '/my-account/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
