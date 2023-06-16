import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import { BsCheck2All } from "react-icons/bs";

export default function AppContainer() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} bg="blue-gray.8">
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 120 }} p="md" bg="blue-gray.7">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '16px' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <BsCheck2All size="2rem" />
            <Text fz="2rem">TO DO LIST</Text>
          </div>
        </Header>
      }
    >
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus qui, quod, modi fugit voluptatem maiores distinctio dolorum nesciunt unde quasi ex vitae reiciendis explicabo quas nulla eveniet. Eum, mollitia cumque!
      Ipsum doloremque, tempore possimus soluta commodi ab quibusdam atque assumenda tempora dolor eaque, reiciendis repudiandae eveniet ad provident? Beatae nobis sequi perspiciatis in ratione? Tenetur delectus quibusdam inventore? Dolorem, sit?
      Omnis, eligendi dolorem repellat porro incidunt deserunt quibusdam eius sit ducimus, sapiente ipsam enim voluptatibus alias corrupti mollitia accusantium quidem saepe, magnam fugiat. Commodi officiis culpa reprehenderit. Magni, quae sed?
      Illo vel vero ratione nemo laudantium quae perspiciatis odio consectetur, voluptate magnam ea atque quasi non. Perferendis, dolor eaque. Numquam nihil, tempore praesentium neque quaerat quas voluptas doloremque corporis similique.
      Fuga similique, eos voluptatem ipsum, earum, sequi neque praesentium vel assumenda ducimus rem quasi ad minus nemo dolorum exercitationem natus magni odit alias. Veniam dolorum maiores nobis adipisci eligendi. Iure.</Text>
    </AppShell>
  );
}