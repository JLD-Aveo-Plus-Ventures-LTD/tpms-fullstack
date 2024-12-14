-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 12:29 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket_payment_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20241111091239_create_tickets_table.js', 1, '2024-11-11 09:13:18'),
(2, '20241111091359_create_payments_table.js', 2, '2024-11-11 09:14:22'),
(3, '20241111105455_create_users_table.js', 3, '2024-11-11 11:54:36'),
(4, '20241120130330_add_discrepancy_reason_to_tickets.js', 4, '2024-11-20 13:03:56'),
(8, '20241128091324_add_columns_to_tickets.js', 5, '2024-11-28 11:02:27'),
(9, '20241128092411_create_services_table.js', 5, '2024-11-28 11:02:27'),
(10, '20241128092433_modify_tickets_table.js', 5, '2024-11-28 11:02:27'),
(13, '20241128105943_add_columns_to_tickets_table.js', 6, '2024-11-28 11:22:26'),
(14, '20241129022210_add_price_column_to_services_table.js', 7, '2024-11-29 02:22:32');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(10) UNSIGNED NOT NULL,
  `ticket_id` int(10) UNSIGNED NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(255) DEFAULT 'Success',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `ticket_id`, `payment_method`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(22, 17, 'Cash', '5000.00', 'Success', '2024-12-02 10:00:18', '2024-12-02 10:00:18'),
(23, 18, 'Cash', '2000.00', 'Discrepancy', '2024-12-02 10:01:52', '2024-12-02 10:01:52'),
(24, 19, 'POS', '70000.00', 'Success', '2024-12-02 10:02:57', '2024-12-02 10:02:57'),
(25, 20, 'Cash', '5000.00', 'Discrepancy', '2024-12-05 09:37:14', '2024-12-05 09:37:14'),
(26, 21, 'Cash', '600.00', 'Success', '2024-12-06 10:09:41', '2024-12-06 10:09:41');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(10) UNSIGNED NOT NULL,
  `ticket_id` int(10) UNSIGNED NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `render_count` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) NOT NULL COMMENT 'Service price'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `ticket_id`, `service_name`, `render_count`, `created_at`, `updated_at`, `price`) VALUES
(9, 17, 'Printing', 1, '2024-11-29 11:22:52', '2024-11-29 11:22:52', '500.00'),
(10, 17, 'Photocopy', 1, '2024-11-29 11:22:52', '2024-11-29 11:22:52', '1500.00'),
(11, 17, 'Lamination', 1, '2024-11-29 11:22:52', '2024-11-29 11:22:52', '3000.00'),
(12, 18, 'Printing', 1, '2024-11-29 12:11:32', '2024-11-29 12:11:32', '5000.00'),
(13, 18, 'Photocopy', 1, '2024-11-29 12:11:32', '2024-11-29 12:11:32', '2000.00'),
(14, 18, 'Lamination', 1, '2024-11-29 12:11:32', '2024-11-29 12:11:32', '200.00'),
(15, 18, 'Registration', 1, '2024-11-29 12:11:32', '2024-11-29 12:11:32', '2000.00'),
(16, 19, 'Test service', 1, '2024-11-29 13:33:46', '2024-11-29 13:33:46', '70000.00'),
(17, 20, 'Service 1', 1, '2024-12-04 09:57:13', '2024-12-04 09:57:13', '1200.00'),
(18, 20, 'Service 2', 1, '2024-12-04 09:57:13', '2024-12-04 09:57:13', '3000.00'),
(19, 20, 'Service 3', 1, '2024-12-04 09:57:13', '2024-12-04 09:57:13', '2800.00'),
(20, 21, 'Sevice AB', 1, '2024-12-05 11:24:10', '2024-12-05 11:24:10', '300.00'),
(21, 21, 'Service BA', 1, '2024-12-05 11:24:10', '2024-12-05 11:24:10', '300.00'),
(22, 22, 'A', 1, '2024-12-06 10:10:43', '2024-12-06 10:10:43', '3000.00'),
(23, 22, 'B', 1, '2024-12-06 10:10:43', '2024-12-06 10:10:43', '5000.00');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticket_id` int(10) UNSIGNED NOT NULL,
  `staff_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_details` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `discrepancy_reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ticket_code` varchar(255) NOT NULL COMMENT 'Auto-generated alphanumeric ID',
  `client_name` varchar(255) DEFAULT NULL COMMENT 'Optional client''s name',
  `client_phone` varchar(255) DEFAULT NULL COMMENT 'Optional client''s phone number',
  `total_price` decimal(10,2) DEFAULT 0.00 COMMENT 'Total price of all services'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `staff_id`, `client_id`, `service_details`, `price`, `status`, `discrepancy_reason`, `created_at`, `updated_at`, `ticket_code`, `client_name`, `client_phone`, `total_price`) VALUES
(17, 4, 0, 'First Client Test', '5000.00', 'Completed', NULL, '2024-11-29 11:22:52', '2024-11-29 11:22:52', 'B4D9', 'First Client Test', '123321', '0.00'),
(18, 6, 0, 'Test Client', '9200.00', 'Discrepancy', 'Debt', '2024-11-29 12:11:32', '2024-11-29 12:11:32', '4955', 'Test Client', '123321', '0.00'),
(19, 4, 0, 'Second Client', '70000.00', 'Completed', NULL, '2024-11-29 13:33:46', '2024-11-29 13:33:46', 'F621', 'Second Client', '546545', '0.00'),
(20, 4, 0, 'Third Client', '7000.00', 'Discrepancy', 'Coming Back', '2024-12-04 09:57:13', '2024-12-04 09:57:13', '7883', 'Third Client', '121212', '0.00'),
(21, 4, 0, 'Fourth Client', '600.00', 'Completed', NULL, '2024-12-05 11:24:10', '2024-12-05 11:24:10', '6554', 'Fourth Client', '121212', '0.00'),
(22, 4, 0, 'Last Client', '8000.00', 'Pending', NULL, '2024-12-06 10:10:43', '2024-12-06 10:10:43', '6B0D', 'Last Client', '12121212', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2a$10$ZeolTAI0.7.xIouD3xWeWOIvM1C0fmNXRXp5pG..U8djJd5kd2/gO', 'admin', '2024-11-11 11:57:48', '2024-11-11 11:57:48'),
(2, 'cashier1', '$2a$10$3VHGDwrT.2lmJimPaChiYuMBnkrKNZmZEEGLuKhlj/RJM1qhvxi8G', 'cashier', '2024-11-12 09:55:40', '2024-11-12 09:55:40'),
(4, 'tester', '$2a$10$ZiW/LqsLSyB9vb.yYsiYsO1Lo/kIqS4pCIWhMJFOBDvy/pIiHb8ea', 'operations', '2024-11-22 08:04:19', '2024-11-22 08:04:19'),
(5, 'Cash1', '$2a$10$.EDzBLQ3RX2fj1sHiU8CduPEvKnNBPIjtbQD4h84TewEFgcRkJPIi', 'cashier', '2024-11-22 10:02:20', '2024-11-22 10:02:20'),
(6, 'staff', '$2a$10$jnUoriGQJEH0loA9G/ZCMew2XodJ6C4Y72AjHZjrLuh0FTv14m3vu', 'cashier', '2024-11-29 12:07:20', '2024-11-29 12:07:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `payments_ticket_id_foreign` (`ticket_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `services_ticket_id_foreign` (`ticket_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticket_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `knex_migrations_lock`
--
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticket_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;