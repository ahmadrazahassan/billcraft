# Assignment #3: Relational Schema Model Design
## BillCraft - Invoice Management System

**Student Name:** ___________________  
**University ID:** ___________________  
**Course:** Database Systems (CS06301)  
**Instructor:** Miss Sonia Raoof  
**Due Date:** [Insert Date]

---

## 1. Introduction to Relational Schema Model

### 1.1 Purpose and Scope

This document presents the complete Relational Schema Model derived from the ER/EER diagrams developed in Assignment 2. The relational schema translates the conceptual ER model into a logical database design that can be directly implemented in a Relational Database Management System (RDBMS).

### 1.2 Transformation Methodology

The transformation from ER/EER model to Relational Schema follows these systematic rules:

**Rule 1:** Each strong entity becomes a relation (table) with all its attributes.

**Rule 2:** Each weak entity becomes a relation including the primary key of its owner entity as a foreign key.

**Rule 3:** One-to-Many (1:N) relationships are represented by adding the primary key of the "one" side as a foreign key in the "many" side.

**Rule 4:** One-to-One (1:1) relationships are represented by adding the primary key of one entity as a foreign key in the other entity with a UNIQUE constraint.

**Rule 5:** Many-to-Many (M:N) relationships become separate relations with foreign keys from both participating entities.

**Rule 6:** Multi-valued attributes become separate relations with a foreign key to the parent entity.

**Rule 7:** Composite attributes are flattened into simple attributes or separate relations.

---

## 2. Complete Relational Schema Design

### 2.1 USERS Relation

**Relation Name:** USERS

**Description:** Stores user account information, business details, and system preferences.

