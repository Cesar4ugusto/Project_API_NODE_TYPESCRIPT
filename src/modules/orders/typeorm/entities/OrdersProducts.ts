import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import Product from "@modules/products/typeorm/entities/Product";
import Order from "@modules/orders/typeorm/entities/Order";

@Entity("orders_products")
class OrdersProducts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal")
    price: number;

    @Column("int")
    quantity: number;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToOne(() => Product, products => products.order_products)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @Column()
    order_id: string;

    @Column()
    product_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default OrdersProducts;
