
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'b@c.com');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'c@c.com');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'd@d.com');

insert into users (email, city, bio, firstname, lastname, username) values ('a@a.com', 'Davis, CA', 'I enjoy hiking and building things', 'Jag', 'Singh', 'jag_singh');
insert into users (email, city, bio, firstname, lastname, username) values ('b@c.com', 'San Francisco, CA', 'Im actually not a person!', 'Carl', 'Fog', 'carl-the-fog');
insert into users (email, city, bio, firstname, lastname, username) values ('c@c.com', 'New York, NY', 'According to Wikipedia, Im brave', 'R2', 'D2', 'r2-r2');
insert into users (email, city, bio, firstname, lastname, username) values ('d@d.com', 'Los Angeles, CA', 'I really love puppies!', 'Laura', 'Cupcakes', 'cupcake18');

insert into posts (poster, details, title) values ('Jag_Singh', 'This is a new site to meet friends, make connections, and post your thoughts. Think of it as a hybrid between a social network and a blog.' , 'Welcome to MyJournals!!');
insert into posts (poster, details, title) values ('CarlTheFog', 'They say the sun never sets on the British empire, and seldom rises in San Francisco. If youve ever wondered why, its thanks to yours truely:) ' , 'Here to Ruin Another Beautiful Day:)');
insert into posts (poster, details, title) values ('Cupcake18', 'As you know from my bio, I REALLY REALLY LOVE PUPPIES! I have two puppies at home (though some might say they are too old to be puppies, theyll always be my puppies). One is Gustav and the other is named Giesla. ' , 'A Little bit About Me');
insert into posts (poster, details, title) values ('R2-D2', 'The recent economic downturn has had a strong negative impact on the space economy, and as a result, Ive been laid off. My skills include fixing shield generators, disabling starships, and searching for lost friends on foreign planets. Ive also had exposure to hyper-drives, though Im not presently an expert in that subject.', 'Looking for a Job!');
