"use client";
import React, { useState } from "react";
import {
  Text,
  Table,
  Skeleton,
  ActionIcon,
  Modal,
  TextInput,
  Button,
  Select,
  Stack,
  Group,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ConvexError } from "convex/values";
import Link from "next/link";

const DepositsHistory = () => {
  const deposits = useQuery(api.deposits.listDeposits);
  const updateDeposit = useMutation(api.deposits.updateDeposit);
  const deleteDeposit = useMutation(api.deposits.deleteDeposits);
  const [openModal, setOpenModal] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<any | null>(null);
  const [newDeposit, setNewDeposit] = useState<Omit<any, "_id">>({
    name: "",
    depositAmount: 0,
    depositDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
    depositNote: "",
  });

  const handleOpenModal = (deposit: any) => {
    setEditingDeposit(deposit);
    setNewDeposit({
      name: deposit.name,
      depositAmount: deposit.depositAmount,
      depositDate: deposit.depositDate,
      depositNote: deposit.depositNote,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDeposit({ ...newDeposit, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeposit) {
      await updateDeposit({
        id: editingDeposit._id,
        name: newDeposit.name,
        depositAmount: Number(newDeposit.depositAmount),
        depositDate: newDeposit.depositDate,
        depositNote: newDeposit.depositNote,
      });
    }
    handleCloseModal();
  };

  const handleDeleteDeposit = async () => {
    if (editingDeposit) {
      await deleteDeposit({ id: editingDeposit._id });
      handleCloseModal();
    }
  };

  return (
    <DashboardCard
      title="Deposits History"
      action={
        <ActionIcon
          component={Link}
          href="/deposit"
          size="lg"
          variant="filled"
          color="blue"
        >
          <IconPlus size={20} />
        </ActionIcon>
      }
    >
      <>
        <div style={{ overflow: "auto", maxWidth: "80vw", maxHeight: "500px" }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Date
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Name
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text size="sm" fw={600}>
                    Amount
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!deposits
                ? Array.from(new Array(5)).map((_, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                      <Table.Td>
                        <Skeleton height={20} />
                      </Table.Td>
                    </Table.Tr>
                  ))
                : deposits.map((deposit) => (
                    <Table.Tr
                      key={deposit._id}
                      onClick={() => handleOpenModal(deposit)}
                      style={{ cursor: "pointer" }}
                    >
                      <Table.Td>
                        <Text size="sm">{deposit.depositDate}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {deposit.name}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          ₱{deposit.depositAmount.toFixed(2)}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
            </Table.Tbody>
          </Table>
        </div>
        <Modal
          opened={openModal}
          onClose={handleCloseModal}
          title={editingDeposit ? "Edit Deposit" : "Add a Deposit"}
          size="sm"
          centered
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Name"
                name="name"
                value={newDeposit.name}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Amount"
                name="depositAmount"
                type="number"
                value={newDeposit.depositAmount}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Deposit Date"
                name="depositDate"
                value={newDeposit.depositDate}
                onChange={(e) =>
                  setNewDeposit({ ...newDeposit, depositDate: e.target.value })
                }
                placeholder="e.g., January 15"
                required
              />
              <TextInput
                label="Note"
                name="depositNote"
                value={newDeposit.depositNote}
                onChange={handleInputChange}
              />
              <Group justify="space-between">
                {editingDeposit && (
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleDeleteDeposit}
                  >
                    Delete
                  </Button>
                )}
                <Button type="submit" color="blue">
                  {editingDeposit ? "Update" : "Add"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>
      </>
    </DashboardCard>
  );
};

export default DepositsHistory;
