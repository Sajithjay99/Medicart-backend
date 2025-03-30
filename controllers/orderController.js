import Order from "../models/order.js";

//add order
 export function addOrder(req,res){
    if(req.user==null){
        res.status(401).json({message:"You must be logged in first"});
        return;
    }

 const data = req.body;
data.email = req.user.email;

    const order = new Order(data);

    order.save()
    .then(()=>{
        res.status(201).json({message:"Order added successfully"});
    }).catch((err)=>{
        res.status(500).json({error:err});
            });
        }
    
    
//get all orders to admin
export function getAllOrders(req,res){
    if(req.user==null){
        res.status(401).json({message:"You must be logged in first"});
        return;
    }

    if(req.user.role=="admin"){
        Order.find()
        .then((orders)=>{
            res.json(orders);
        }).catch((err)=>{
            res.status(500).json({error:err});
        });
    }
    
}

//get orders to customer
export function getorderstocustomer(req,res){
    if(req.user==null){
        res.status(401).json({message:"You must be logged in first"});
        return;
    }

    if(req.user.role=="customer"){
    
   Order.find(
    { email: req.user.email}).then((orders)=>{
        res.json(orders);
    }).catch((err)=>{        
        res.status(500).json({error:err});
    });
}
}

//delete orders by admin
export function deleteOrder(req,res){
    if(req.user==null){
        res.status(401).json({message:"You must be logged in first"});
        return;
    }

    if(req.user.role=="admin"){
        Order.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.json({message:"Order deleted successfully"});
        }).catch((err)=>{
            res.status(500).json({error:err});
        });
    }
    
}

//delete orders by customer

export function deleteOrderbyCustomer(req,res){
    if(req.user==null){
        res.status(401).json({message:"You must be logged in first"});
        return;
    }

    if(req.user.role=="customer"){
        Order.findByIdAndDelete(req.params.id)
        .then((orders)=>{
            
            res.json({message:"Order deleted successfully"});
        }).catch((err)=>{
            res.status(500).json({error:err});
        });
    }
    
}

//approve by admin

export function approveOrder(req, res) {
    const id = req.params.id;
    if (!req.user) {
        return res.status(401).json({ message: "You must be logged in first" });
    }
    if (req.user.role === "admin") {
        Order.updateOne({ _id: id }, { isApproved: true, status: "approved" }) // Ensure status is updated
            .then(() => {
                res.json({ message: "Order approved successfully" });
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}


//update order by customer
export function updateOrder(req, res) {
    const id = req.params.id;

    if (!req.user) {
        return res.status(401).json({ message: "You must be logged in first" });
    }

    if (req.user.role === "customer") {
        Order.findById(id)
            .then((order) => {
                if (!order) {
                    return res.status(404).json({ message: "Order not found" });
                }
                if (order.isApproved) {
                    return res.status(403).json({ message: "Cannot edit an approved order" });
                }
                Order.findByIdAndUpdate(
                    id,
                    { $set: req.body },
                    { new: true, runValidators: true } 
                )
                    .then((updatedOrder) => {
                        res.json({ message: "Order updated successfully", order: updatedOrder });
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err.message });
                    });
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    } else {
        res.status(403).json({ message: "Unauthorized to update order" });
    }
}