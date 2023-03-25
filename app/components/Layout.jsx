import Header from './header';
import Footer from './footer';
import {Drawer, useDrawer} from '~/components/Drawer';
import {useMatches} from '@remix-run/react';
import {CartDrawer} from './cart';

export function Layout({children}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const [root] = useMatches();
  const cart = root.data?.cart;
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          <Header openDrawer={openDrawer} cart={cart} isOpen={isOpen} />
          <main className="mb-16">{children}</main>
        </div>
        <Footer />
      </div>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </>
  );
}
