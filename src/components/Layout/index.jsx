import { Frame, Navigation, TopBar } from "@shopify/polaris";
import { ArrowLeftMinor, HomeMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

const logo = {
  width: 124,
  topBarSource:
    "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
  url: "/",
  accessibilityLabel: "Mageworx",
};

function Layout({ children }) {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [
                { content: "Support", icon: ArrowLeftMinor },
                { content: "Back to Shopify", icon: ArrowLeftMinor },
                { content: "Log out", icon: ArrowLeftMinor },
              ],
            },
          ]}
          name="Mukesh Purohit"
          detail="Polaris techtic demo"
          initials="M"
          open={userMenuActive}
          onToggle={toggleUserMenuActive}
        />
      }
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        fill
        items={[
          {
            url: "/",
            // label: "Product Options",
            // icon: HomeMajor,
            subNavigationItems: [
              {
                url: "/",
                label: "Option sets",
              },
              {
                url: "/products",
                label: "Products",
              },
              {
                url: "/settings",
                label: "Settings",
              },
            ],
          },
        ]}
      />

      <Navigation.Section
        items={[
          {
            label: "Help center",
            icon: HomeMajor,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      logo={logo}
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
}

export default Layout;
