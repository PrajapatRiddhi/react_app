import {
  Page,
  Grid,
  Button,
  Card,
  Tabs,
  Checkbox,
  Filters,
  IndexTable,
  Link,
  TextStyle,
  Thumbnail,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import React from "react";
import classes from "../styles/dashboard.module.css";
import { useState, useCallback } from "react";
import { LinkMinor } from "@shopify/polaris-icons";

const data = [
  {
    id: "1",
    image:
      "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
    name: "Valencia Tuscany Home Theater Seating",
    link: "/",
    type: "Home Theater Recliner",
    vendor: "Premium Top Grain Italian",
    options: 3,
  },
];

function Dashboard() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const customers = [
    {
      id: "3416",
      url: "customers/341",
      name: "Mae Jemison",
      location: "Decatur, USA",
      orders: 20,
      amountSpent: "$2,400",
    },
    {
      id: "2566",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      orders: 30,
      amountSpent: "$140",
    },
  ];
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);
  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState(null);
  const [sortValue, setSortValue] = useState("today");

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  const handleSortChange = useCallback((value) => setSortValue(value), []);

  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }

  const filters = [
    {
      key: "taggedWith",
      label: "Prodcut Vendor",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },

    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },

    {
      key: "taggedWith",
      label: "Status",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },

    {
      key: "taggedWith",
      label: "More filters",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },

    {
      key: "taggedWith",
      label: "Saved",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },

    {
      key: "taggedWith",
      label: "Short",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const [availability, setAvailability] = useState(null);
  const [productType, setProductType] = useState(null);

  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleAvailabilityRemove = useCallback(() => setAvailability(null), []);
  const handleProductTypeRemove = useCallback(() => setProductType(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAvailabilityRemove();
    handleProductTypeRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAvailabilityRemove,
    handleQueryValueRemove,
    handleProductTypeRemove,
    handleTaggedWithRemove,
  ]);

  const appliedFilters = [];
  if (!isEmpty(availability)) {
    const key = "availability";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, availability),
      onRemove: handleAvailabilityRemove,
    });
  }
  if (!isEmpty(productType)) {
    const key = "productType";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, productType),
      onRemove: handleProductTypeRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const tabs = [
    {
      id: "all-customers-1",
      content: "All",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Active",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Draft",
      panelID: "repeat-customers-content-1",
    },
    {
      id: "prospects-1",
      content: "Acrchived",
      panelID: "prospects-content-1",
    },
  ];

  return (
    <div>
      <Page fullWidth>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <h1 className="Polaris-Header-Title">Products</h1>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <Button className={classes.addbtn} primary>
              Add product
            </Button>
          </Grid.Cell>
        </Grid>
      </Page>

      <div className={classes.table}>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            {/* <p>Tab {selected} selected</p> */}

            <Card>
              <Card.Section>
                <Filters
                  queryValue={queryValue}
                  filters={filters}
                  appliedFilters={appliedFilters}
                  onQueryChange={handleFiltersQueryChange}
                  onQueryClear={handleQueryValueRemove}
                  onClearAll={handleFiltersClearAll}
                />
              </Card.Section>
              <div className={classes.tableCountCheckbox}>
                <Checkbox
                  label={`Showing ${data.length} products`}
                  checked={allResourcesSelected}
                  onChange={() =>
                    handleSelectionChange("all", !allResourcesSelected)
                  }
                />
              </div>
              <IndexTable
                itemCount={data.length}
                selectedItemsCount={
                  allResourcesSelected ? "All" : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  {
                    title: "Name",
                    hidden: true,
                  },
                  {
                    title: "Product",
                  },
                  {
                    title: "Inventory",
                  },
                  {
                    title: "Type",
                  },
                  {
                    title: "Vendor",
                  },
                  {
                    title: "Options",
                  },
                ]}
                columnContentTypes={["text", "text", "text", "text", "text"]}
              >
                {data.map((el, index) => (
                  <IndexTable.Row
                    id={el.id}
                    key={el.id}
                    selected={selectedResources.includes(el.id)}
                    position={index}
                  >
                    <IndexTable.Cell>
                      <Thumbnail source={el.image} alt={el.name} />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <Link external url="/">
                        <TextStyle>{el.name}</TextStyle>
                        <LinkMinor
                          height="16"
                          width="16"
                          className={classes.productLink}
                        />
                      </Link>
                    </IndexTable.Cell>
                    <IndexTable.Cell>7 in stock</IndexTable.Cell>
                    <IndexTable.Cell>{el.type}</IndexTable.Cell>
                    <IndexTable.Cell>{el.vendor}</IndexTable.Cell>
                    <IndexTable.Cell>{el.options} Options</IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>
            </Card>
          </Card.Section>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
