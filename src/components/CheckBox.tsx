import { UnstyledButton, ActionIcon, Text, createStyles, rem, useMantineTheme, Box } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { AiOutlineEdit } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

const useStyles = createStyles((theme) => ({
  button: {
    justifyContent: "space-between",
    width: '100%',
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.lg,
    backgroundColor: "rgba(2, 14, 23, 0.7)",
    gap: "0.5rem",

    '&:hover': {
      backgroundColor: "rgba(2, 14, 23, 0.8)",
    },
  },
}));

interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function CheckboxCard({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  ...others
}: CheckboxCardProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CheckboxCardProps>) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      display="flex"
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >

        <ActionIcon>
            <AiOutlineEdit size="1.25rem" />
        </ActionIcon>
      

        <Box>
            <Text fw={500} sx={{ lineHeight: 1 }}>
            {title}
            </Text>
            <Text fz="sm" c="dimmed">
            {description}
            </Text>
        </Box>

        <ActionIcon variant="outline">
            <IoMdClose size="1.25rem" />
        </ActionIcon>
    </UnstyledButton>
  );
}