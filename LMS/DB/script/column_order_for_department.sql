

ALTER TABLE T_DEPARTMENT ADD int_order_number INT 
ALTER TABLE T_DEPARTMENT_AUDIT ADD int_order_number INT 
GO

UPDATE T_DEPARTMENT SET int_order_number = 1
WHERE tx_dept_name = 'PPC'

UPDATE T_DEPARTMENT SET int_order_number = 2
WHERE tx_dept_name = 'CRM'

UPDATE T_DEPARTMENT SET int_order_number = 3
WHERE tx_dept_name = 'CAD'

UPDATE T_DEPARTMENT SET int_order_number = 4
WHERE tx_dept_name = 'CIB'