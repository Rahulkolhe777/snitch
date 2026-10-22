image in form of buffer


why we soulld not compare mongooseId with == or === 
because 
why we should not compare mongodb with ==
You should not compare MongoDB documents or field values using simple equality operators like == in programming languages or native queries because MongoDB structures and stores data as BSON (Binary JSON), which includes complex objects, arrays, and type-specific data types rather than primitive scalar values
ans=> if you really want to compare convert both to stsring first then compare