export interface City {
  name: string
  slug: string
  distance: number
  county?: string
  population?: string
  zipCodes?: string[]
  landmarks?: string[]
  neighborhoods?: string[]
}

export const cities: City[] = [
  // 0-5 MILES
  { name: 'Hudson', slug: 'hudson', distance: 3.13, county: 'Middlesex County', population: '20,000+', zipCodes: ['01749'], landmarks: ['Downtown Hudson', 'Assabet River Rail Trail'], neighborhoods: ['Downtown Hudson', 'Hudson Center'] },
  { name: 'Southborough', slug: 'southborough', distance: 3.19, county: 'Worcester County', population: '10,000+', zipCodes: ['01772'], landmarks: ['St. Mark\'s School', 'Breakneck Hill Conservation Land'], neighborhoods: ['Southborough Center', 'Cordaville'] },
  { name: 'Berlin', slug: 'berlin', distance: 5.17, county: 'Worcester County', population: '3,000+', zipCodes: ['01503'], landmarks: ['Assabet River National Wildlife Refuge'], neighborhoods: ['Berlin Center', 'South Berlin'] },

  // 5-10 MILES
  { name: 'Northborough', slug: 'northborough', distance: 5.30, county: 'Worcester County', population: '15,000+', zipCodes: ['01532'], landmarks: ['Assabet River Rail Trail', 'Northborough Crossing'], neighborhoods: ['Northborough Center', 'West Northborough'] },
  { name: 'Cordaville', slug: 'cordaville', distance: 5.64, county: 'Worcester County', population: '5,000+', zipCodes: ['01772'], landmarks: ['Cordaville Mill', 'Breakneck Hill'], neighborhoods: ['Cordaville Village'] },
  { name: 'Stow', slug: 'stow', distance: 6.41, county: 'Middlesex County', population: '7,000+', zipCodes: ['01775'], landmarks: ['Collings Foundation', 'Lake Boon'], neighborhoods: ['Stow Center', 'Gleasondale'] },
  { name: 'Westborough', slug: 'westborough', distance: 6.58, county: 'Worcester County', population: '19,000+', zipCodes: ['01581', '01582'], landmarks: ['Westborough Station', 'Cedar Hill'], neighborhoods: ['Downtown Westborough', 'Westborough Center'] },
  { name: 'Framingham Center', slug: 'framingham-center', distance: 6.59, county: 'Middlesex County', population: '8,000+', zipCodes: ['01701'], landmarks: ['Framingham Centre Common', 'Edgell Memorial Library'], neighborhoods: ['Framingham Center', 'Nobscot'] },
  { name: 'Bolton', slug: 'bolton', distance: 6.64, county: 'Worcester County', population: '5,000+', zipCodes: ['01740'], landmarks: ['Nashoba Valley Ski Area', 'Bolton Flats Wildlife Management Area'], neighborhoods: ['Bolton Center', 'South Bolton'] },
  { name: 'Sudbury', slug: 'sudbury', distance: 7.01, county: 'Middlesex County', population: '18,000+', zipCodes: ['01776'], landmarks: ['Wayside Inn', 'Great Meadows National Wildlife Refuge'], neighborhoods: ['Sudbury Center', 'North Sudbury'] },
  { name: 'Ashland', slug: 'ashland', distance: 7.38, county: 'Middlesex County', population: '17,000+', zipCodes: ['01721'], landmarks: ['Ashland State Park', 'Downtown Ashland'], neighborhoods: ['Ashland Center', 'Warren Woods'] },
  { name: 'Maynard', slug: 'maynard', distance: 7.61, county: 'Middlesex County', population: '11,000+', zipCodes: ['01754'], landmarks: ['Mill & Main', 'Assabet River Rail Trail'], neighborhoods: ['Downtown Maynard', 'Maynard Center'] },
  { name: 'Framingham', slug: 'framingham', distance: 8.18, county: 'Middlesex County', population: '72,000+', zipCodes: ['01701', '01702', '01703'], landmarks: ['Framingham Station', 'Natick Mall'], neighborhoods: ['Downtown Framingham', 'South Framingham', 'Saxonville'] },
  { name: 'Hopkinton', slug: 'hopkinton', distance: 8.40, county: 'Middlesex County', population: '18,000+', zipCodes: ['01748'], landmarks: ['Boston Marathon Starting Line', 'Hopkinton State Park'], neighborhoods: ['Hopkinton Center', 'Woodville'] },
  { name: 'Clinton', slug: 'clinton', distance: 8.43, county: 'Worcester County', population: '14,000+', zipCodes: ['01510'], landmarks: ['Wachusett Reservoir', 'Downtown Clinton'], neighborhoods: ['Clinton Center', 'South Clinton'] },
  { name: 'Boylston', slug: 'boylston', distance: 8.60, county: 'Worcester County', population: '4,500+', zipCodes: ['01505'], landmarks: ['Wachusett Reservoir', 'Tower Hill Botanic Garden'], neighborhoods: ['Boylston Center', 'Morningdale'] },
  { name: 'Shrewsbury', slug: 'shrewsbury', distance: 9.31, county: 'Worcester County', population: '38,000+', zipCodes: ['01545'], landmarks: ['White City', 'Lake Quinsigamond'], neighborhoods: ['Shrewsbury Center', 'Edgemere'] },
  { name: 'Wayland', slug: 'wayland', distance: 9.44, county: 'Middlesex County', population: '13,000+', zipCodes: ['01778'], landmarks: ['Wayland Town Center', 'Dudley Pond'], neighborhoods: ['Wayland Center', 'Cochituate'] },
  { name: 'Cochituate', slug: 'cochituate', distance: 9.46, county: 'Middlesex County', population: '7,000+', zipCodes: ['01778'], landmarks: ['Lake Cochituate', 'Cochituate State Park'], neighborhoods: ['Cochituate Village'] },
  { name: 'South Lancaster', slug: 'south-lancaster', distance: 9.78, county: 'Worcester County', population: '2,000+', zipCodes: ['01561'], landmarks: ['Atlantic Union College'], neighborhoods: ['South Lancaster Village'] },
  { name: 'Lancaster', slug: 'lancaster', distance: 9.83, county: 'Worcester County', population: '8,000+', zipCodes: ['01523'], landmarks: ['Lancaster Town Common', 'Fort Devens'], neighborhoods: ['Lancaster Center', 'South Lancaster'] },

  // 10-15 MILES
  { name: 'Harvard', slug: 'harvard', distance: 10.61, county: 'Worcester County', population: '6,500+', zipCodes: ['01451'], landmarks: ['Fruitlands Museum', 'Harvard Common'], neighborhoods: ['Harvard Center', 'Still River'] },
  { name: 'West Concord', slug: 'west-concord', distance: 10.76, county: 'Middlesex County', population: '6,000+', zipCodes: ['01742'], landmarks: ['West Concord Station', 'Nashoba Brook'], neighborhoods: ['West Concord Village'] },
  { name: 'Natick', slug: 'natick', distance: 10.99, county: 'Middlesex County', population: '37,000+', zipCodes: ['01760'], landmarks: ['Natick Mall', 'Natick Center'], neighborhoods: ['Downtown Natick', 'South Natick', 'West Natick'] },
  { name: 'Acton', slug: 'acton', distance: 11.01, county: 'Middlesex County', population: '24,000+', zipCodes: ['01720'], landmarks: ['Discovery Museums', 'NARA Park'], neighborhoods: ['Acton Center', 'West Acton', 'South Acton'] },
  { name: 'Sherborn', slug: 'sherborn', distance: 11.77, county: 'Middlesex County', population: '4,500+', zipCodes: ['01770'], landmarks: ['Sherborn Town Center', 'Farm Pond'], neighborhoods: ['Sherborn Center'] },
  { name: 'Holliston', slug: 'holliston', distance: 12.01, county: 'Middlesex County', population: '15,000+', zipCodes: ['01746'], landmarks: ['Holliston Center', 'Lake Winthrop'], neighborhoods: ['Holliston Center', 'Metcalf Field'] },
  { name: 'Grafton', slug: 'grafton', distance: 12.15, county: 'Worcester County', population: '19,000+', zipCodes: ['01519'], landmarks: ['Grafton Common', 'Blackstone River'], neighborhoods: ['Grafton Center', 'North Grafton', 'South Grafton'] },
  { name: 'West Boylston', slug: 'west-boylston', distance: 12.32, county: 'Worcester County', population: '8,000+', zipCodes: ['01583'], landmarks: ['Wachusett Reservoir', 'Beaman Pond'], neighborhoods: ['West Boylston Center', 'Oakdale'] },
  { name: 'Upton', slug: 'upton', distance: 12.41, county: 'Worcester County', population: '8,000+', zipCodes: ['01568'], landmarks: ['Upton State Forest', 'Pratt Pond'], neighborhoods: ['Upton Center', 'West Upton'] },
  { name: 'Weston', slug: 'weston', distance: 12.43, county: 'Middlesex County', population: '12,000+', zipCodes: ['02493'], landmarks: ['Case Estates', 'Weston Town Center'], neighborhoods: ['Weston Center', 'Kendal Green'] },
  { name: 'Sterling', slug: 'sterling', distance: 12.57, county: 'Worcester County', population: '8,000+', zipCodes: ['01564'], landmarks: ['Wachusett Reservoir', 'Sterling Town Common'], neighborhoods: ['Sterling Center', 'West Sterling'] },
  { name: 'Concord', slug: 'concord', distance: 12.64, county: 'Middlesex County', population: '18,000+', zipCodes: ['01742'], landmarks: ['Walden Pond', 'Minute Man National Park', 'Old North Bridge'], neighborhoods: ['Concord Center', 'West Concord'] },
  { name: 'Marlborough', slug: 'marlborough', distance: 12.80, county: 'Middlesex County', population: '41,000+', zipCodes: ['01752'], landmarks: ['Ghiloni Park', 'Marlborough Downtown', 'Wayside Rail Trail'], neighborhoods: ['Downtown Marlborough', 'East Marlborough', 'West Marlborough'] },
  { name: 'Hamilton', slug: 'hamilton', distance: 13.04, county: 'Worcester County', population: '8,000+', zipCodes: ['01936'], landmarks: ['Myopia Hunt Club'], neighborhoods: ['Hamilton Center'] },
  { name: 'Lincoln', slug: 'lincoln', distance: 13.42, county: 'Middlesex County', population: '7,000+', zipCodes: ['01773'], landmarks: ['DeCordova Museum', 'Drumlin Farm'], neighborhoods: ['Lincoln Center'] },
  { name: 'Wellesley', slug: 'wellesley', distance: 13.42, county: 'Norfolk County', population: '29,000+', zipCodes: ['02481', '02482'], landmarks: ['Wellesley College', 'Wellesley Town Center'], neighborhoods: ['Wellesley Center', 'Wellesley Hills', 'Wellesley Farms'] },
  { name: 'Sunderland', slug: 'sunderland', distance: 13.64, county: 'Franklin County', population: '3,700+', zipCodes: ['01375'], landmarks: ['Mount Sugarloaf'], neighborhoods: ['Sunderland Center'] },
  { name: 'Littleton Common', slug: 'littleton-common', distance: 14.07, county: 'Middlesex County', population: '3,000+', zipCodes: ['01460'], landmarks: ['Littleton Common'], neighborhoods: ['Littleton Center'] },
  { name: 'Worcester', slug: 'worcester', distance: 14.42, county: 'Worcester County', population: '206,000+', zipCodes: ['01601', '01602', '01603', '01604', '01605', '01606', '01607', '01608', '01609', '01610'], landmarks: ['DCU Center', 'Worcester Art Museum', 'Hanover Theatre'], neighborhoods: ['Downtown Worcester', 'West Side', 'East Side', 'Main South'] },
  { name: 'Shirley', slug: 'shirley', distance: 14.46, county: 'Middlesex County', population: '7,500+', zipCodes: ['01464'], landmarks: ['Shirley Center'], neighborhoods: ['Shirley Center'] },
  { name: 'Milford', slug: 'milford', distance: 14.54, county: 'Worcester County', population: '30,000+', zipCodes: ['01757'], landmarks: ['Downtown Milford', 'Milford Town Hall'], neighborhoods: ['Downtown Milford', 'West Milford'] },
  { name: 'Northbridge', slug: 'northbridge', distance: 14.65, county: 'Worcester County', population: '16,000+', zipCodes: ['01534'], landmarks: ['Blackstone River', 'Rockdale Mills'], neighborhoods: ['Northbridge Center', 'Whitinsville'] },
  { name: 'Ayer', slug: 'ayer', distance: 14.83, county: 'Middlesex County', population: '8,000+', zipCodes: ['01432'], landmarks: ['Fort Devens', 'Ayer Town Hall'], neighborhoods: ['Ayer Center', 'Devens'] },

  // 15-20 MILES
  { name: 'Hopedale', slug: 'hopedale', distance: 15.10, county: 'Worcester County', population: '6,000+', zipCodes: ['01747'], landmarks: ['Hopedale Parklands', 'Hopedale Village'], neighborhoods: ['Hopedale Center'] },
  { name: 'Dover', slug: 'dover', distance: 15.20, county: 'Norfolk County', population: '6,000+', zipCodes: ['02030'], landmarks: ['Noanet Woodlands', 'Dover Town Center'], neighborhoods: ['Dover Center'] },
  { name: 'Millbury', slug: 'millbury', distance: 15.34, county: 'Worcester County', population: '13,500+', zipCodes: ['01527'], landmarks: ['Millbury Town Common', 'Blackstone River'], neighborhoods: ['Millbury Center'] },
  { name: 'Millis', slug: 'millis', distance: 15.79, county: 'Norfolk County', population: '8,000+', zipCodes: ['02054'], landmarks: ['Millis Town Center'], neighborhoods: ['Millis Center'] },
  { name: 'Waltham', slug: 'waltham', distance: 15.93, county: 'Middlesex County', population: '65,000+', zipCodes: ['02451', '02452', '02453', '02454'], landmarks: ['Brandeis University', 'Moody Street', 'Charles River Museum'], neighborhoods: ['Downtown Waltham', 'Piety Corner', 'South Side'] },
  { name: 'Carlisle', slug: 'carlisle', distance: 15.96, county: 'Middlesex County', population: '5,000+', zipCodes: ['01741'], landmarks: ['Great Brook Farm State Park'], neighborhoods: ['Carlisle Center'] },
  { name: 'Millis-Clicquot', slug: 'millis-clicquot', distance: 16.05, county: 'Norfolk County', population: '1,000+', zipCodes: ['02054'], landmarks: ['Clicquot Club Building'], neighborhoods: ['Clicquot'] },
  { name: 'Medway', slug: 'medway', distance: 16.22, county: 'Norfolk County', population: '13,000+', zipCodes: ['02053'], landmarks: ['Medway Village', 'Choate Park'], neighborhoods: ['Medway Center', 'West Medway'] },
  { name: 'Holden', slug: 'holden', distance: 16.24, county: 'Worcester County', population: '19,000+', zipCodes: ['01520'], landmarks: ['Wachusett Reservoir', 'Holden Town Common'], neighborhoods: ['Holden Center', 'Jefferson'] },
  { name: 'Leominster', slug: 'leominster', distance: 16.35, county: 'Worcester County', population: '41,000+', zipCodes: ['01453'], landmarks: ['Doyle Field', 'Leominster State Forest'], neighborhoods: ['Downtown Leominster', 'North Leominster'] },
  { name: 'Medfield', slug: 'medfield', distance: 16.55, county: 'Norfolk County', population: '12,500+', zipCodes: ['02052'], landmarks: ['Medfield State Hospital', 'Noon Hill'], neighborhoods: ['Medfield Center'] },
  { name: 'Needham', slug: 'needham', distance: 16.61, county: 'Norfolk County', population: '31,000+', zipCodes: ['02492', '02494'], landmarks: ['Needham Town Center', 'Charles River'], neighborhoods: ['Needham Center', 'Needham Heights', 'Highlandville'] },
  { name: 'Westford', slug: 'westford', distance: 16.82, county: 'Middlesex County', population: '24,000+', zipCodes: ['01886'], landmarks: ['Nashoba Valley Ski Area', 'Westford Town Common'], neighborhoods: ['Westford Center', 'Forge Village', 'Graniteville'] },
  { name: 'Mendon', slug: 'mendon', distance: 16.82, county: 'Worcester County', population: '6,000+', zipCodes: ['01756'], landmarks: ['Mendon Town Common'], neighborhoods: ['Mendon Center'] },
  { name: 'Bedford', slug: 'bedford', distance: 16.86, county: 'Middlesex County', population: '14,000+', zipCodes: ['01730'], landmarks: ['Minuteman Bikeway', 'Bedford Town Center'], neighborhoods: ['Bedford Center', 'Springs Brook'] },
  { name: 'Newton', slug: 'newton', distance: 17.19, county: 'Middlesex County', population: '88,000+', zipCodes: ['02458', '02459', '02460', '02461', '02462', '02464', '02465', '02466', '02467', '02468'], landmarks: ['Boston College', 'Newton Centre', 'Crystal Lake'], neighborhoods: ['Newton Centre', 'Newton Highlands', 'West Newton', 'Newtonville'] },
  { name: 'Whitinsville', slug: 'whitinsville', distance: 17.56, county: 'Worcester County', population: '7,000+', zipCodes: ['01588'], landmarks: ['Whitin Mill', 'Blackstone River'], neighborhoods: ['Whitinsville Village'] },
  { name: 'Sutton', slug: 'sutton', distance: 17.68, county: 'Worcester County', population: '9,000+', zipCodes: ['01590'], landmarks: ['Purgatory Chasm State Reservation'], neighborhoods: ['Sutton Center', 'Wilkinsonville'] },
  { name: 'Lexington', slug: 'lexington', distance: 17.73, county: 'Middlesex County', population: '34,000+', zipCodes: ['02420', '02421'], landmarks: ['Lexington Battle Green', 'Minute Man National Park'], neighborhoods: ['Lexington Center', 'East Lexington'] },
  { name: 'Groton', slug: 'groton', distance: 18.17, county: 'Middlesex County', population: '11,000+', zipCodes: ['01450'], landmarks: ['Groton School', 'Nashua River'], neighborhoods: ['Groton Center', 'West Groton'] },
  { name: 'Princeton', slug: 'princeton', distance: 18.28, county: 'Worcester County', population: '3,500+', zipCodes: ['01541'], landmarks: ['Wachusett Mountain', 'Princeton Town Common'], neighborhoods: ['Princeton Center'] },
  { name: 'Auburn', slug: 'auburn', distance: 18.28, county: 'Worcester County', population: '16,000+', zipCodes: ['01501'], landmarks: ['Pakachoag Hill', 'Auburn Mall'], neighborhoods: ['Auburn Center', 'Stoneville'] },
  { name: 'Bellingham', slug: 'bellingham', distance: 18.49, county: 'Norfolk County', population: '17,000+', zipCodes: ['02019'], landmarks: ['Lake Hiawatha', 'Bellingham Town Common'], neighborhoods: ['Bellingham Center', 'South Bellingham'] },
  { name: 'Watertown', slug: 'watertown', distance: 18.58, county: 'Middlesex County', population: '35,000+', zipCodes: ['02472'], landmarks: ['Arsenal Yards', 'Watertown Square'], neighborhoods: ['Watertown Square', 'East Watertown'] },
  { name: 'Westwood', slug: 'westwood', distance: 18.88, county: 'Norfolk County', population: '16,000+', zipCodes: ['02090'], landmarks: ['Hale Reservation', 'Westwood Station'], neighborhoods: ['Westwood Center', 'Islington'] },
  { name: 'Belmont', slug: 'belmont', distance: 19.00, county: 'Middlesex County', population: '27,000+', zipCodes: ['02478'], landmarks: ['Belmont Hill', 'Belmont Center'], neighborhoods: ['Belmont Center', 'Cushing Square', 'Waverley Square'] },
  { name: 'Lunenburg', slug: 'lunenburg', distance: 19.26, county: 'Worcester County', population: '11,000+', zipCodes: ['01462'], landmarks: ['Lake Shirley', 'Lunenburg Town Common'], neighborhoods: ['Lunenburg Center', 'West Lunenburg'] },
  { name: 'Uxbridge', slug: 'uxbridge', distance: 19.27, county: 'Worcester County', population: '14,000+', zipCodes: ['01569'], landmarks: ['Blackstone River', 'Uxbridge Town Common'], neighborhoods: ['Uxbridge Center', 'North Uxbridge'] },
  { name: 'Norfolk', slug: 'norfolk', distance: 19.46, county: 'Norfolk County', population: '12,000+', zipCodes: ['02056'], landmarks: ['Stony Brook Wildlife Sanctuary'], neighborhoods: ['Norfolk Center'] },
  { name: 'Chelmsford', slug: 'chelmsford', distance: 19.56, county: 'Middlesex County', population: '36,000+', zipCodes: ['01824'], landmarks: ['Chelmsford Center', 'Great Brook Farm'], neighborhoods: ['Chelmsford Center', 'North Chelmsford', 'South Chelmsford'] },
  { name: 'Paxton', slug: 'paxton', distance: 19.72, county: 'Worcester County', population: '5,000+', zipCodes: ['01612'], landmarks: ['Moore State Park', 'Paxton Town Common'], neighborhoods: ['Paxton Center'] },
  { name: 'Franklin', slug: 'franklin', distance: 19.87, county: 'Norfolk County', population: '33,000+', zipCodes: ['02038'], landmarks: ['Franklin Town Common', 'Forge Park'], neighborhoods: ['Franklin Center', 'West Franklin'] },
  { name: 'Leicester', slug: 'leicester', distance: 19.89, county: 'Worcester County', population: '11,000+', zipCodes: ['01524'], landmarks: ['Leicester Town Common'], neighborhoods: ['Leicester Center', 'Cherry Valley', 'Rochdale'] },

  // 20-25 MILES
  { name: 'Billerica', slug: 'billerica', distance: 20.20, county: 'Middlesex County', population: '42,000+', zipCodes: ['01821'], landmarks: ['Billerica Town Common', 'Great Meadows National Wildlife Refuge'], neighborhoods: ['Billerica Center', 'North Billerica', 'Pinehurst'] },
  { name: 'Arlington', slug: 'arlington', distance: 20.38, county: 'Middlesex County', population: '46,000+', zipCodes: ['02474', '02476'], landmarks: ['Arlington Center', 'Spy Pond', 'Minuteman Bikeway'], neighborhoods: ['Arlington Center', 'Arlington Heights', 'East Arlington'] },
  { name: 'Pinehurst', slug: 'pinehurst', distance: 20.42, county: 'Middlesex County', population: '5,000+', zipCodes: ['01866'], landmarks: ['Pinehurst Plaza'], neighborhoods: ['Pinehurst'] },
  { name: 'Rutland', slug: 'rutland', distance: 20.61, county: 'Worcester County', population: '9,000+', zipCodes: ['01543'], landmarks: ['Rutland State Park'], neighborhoods: ['Rutland Center'] },
  { name: 'Norwood', slug: 'norwood', distance: 20.66, county: 'Norfolk County', population: '31,000+', zipCodes: ['02062'], landmarks: ['Norwood Town Common', 'Endean Park'], neighborhoods: ['Norwood Center', 'South Norwood'] },
  { name: 'Dedham', slug: 'dedham', distance: 20.76, county: 'Norfolk County', population: '25,000+', zipCodes: ['02026', '02027'], landmarks: ['Legacy Place', 'Dedham Square'], neighborhoods: ['Dedham Center', 'East Dedham', 'Oakdale'] },
  { name: 'Fitchburg', slug: 'fitchburg', distance: 20.82, county: 'Worcester County', population: '41,000+', zipCodes: ['01420'], landmarks: ['Fitchburg Art Museum', 'Rollstone Boulder'], neighborhoods: ['Downtown Fitchburg', 'West Fitchburg'] },
  { name: 'Burlington', slug: 'burlington', distance: 20.84, county: 'Middlesex County', population: '26,000+', zipCodes: ['01803'], landmarks: ['Burlington Mall', 'Mary Cummings Park'], neighborhoods: ['Burlington Center'] },
  { name: 'Walpole', slug: 'walpole', distance: 20.84, county: 'Norfolk County', population: '25,000+', zipCodes: ['02081'], landmarks: ['Walpole Town Common', 'Bird Park'], neighborhoods: ['Walpole Center', 'East Walpole', 'South Walpole'] },
  { name: 'East Douglas', slug: 'east-douglas', distance: 20.97, county: 'Worcester County', population: '3,000+', zipCodes: ['01516'], landmarks: ['Wallis Pond'], neighborhoods: ['East Douglas Village'] },
  { name: 'Brookline', slug: 'brookline', distance: 21.70, county: 'Norfolk County', population: '59,000+', zipCodes: ['02445', '02446', '02467'], landmarks: ['Coolidge Corner', 'Brookline Village', 'JFK National Historic Site'], neighborhoods: ['Coolidge Corner', 'Brookline Village', 'Washington Square'] },
  { name: 'Jamaica Plain', slug: 'jamaica-plain', distance: 21.89, county: 'Suffolk County', population: '41,000+', zipCodes: ['02130'], landmarks: ['Arnold Arboretum', 'Jamaica Pond', 'Centre Street'], neighborhoods: ['JP Centre', 'Egleston Square', 'Forest Hills'] },
  { name: 'East Pepperell', slug: 'east-pepperell', distance: 21.90, county: 'Middlesex County', population: '2,000+', zipCodes: ['01437'], landmarks: ['Nashua River'], neighborhoods: ['East Pepperell Village'] },
  { name: 'Woburn', slug: 'woburn', distance: 21.98, county: 'Middlesex County', population: '40,000+', zipCodes: ['01801', '01807', '01813'], landmarks: ['Woburn Mall', 'Horn Pond'], neighborhoods: ['Woburn Center', 'North Woburn'] },
  { name: 'Pepperell', slug: 'pepperell', distance: 22.00, county: 'Middlesex County', population: '12,000+', zipCodes: ['01463'], landmarks: ['Nashua River', 'Pepperell Town Common'], neighborhoods: ['Pepperell Center', 'East Pepperell'] },
  { name: 'Winchester', slug: 'winchester', distance: 22.03, county: 'Middlesex County', population: '22,000+', zipCodes: ['01890'], landmarks: ['Winchester Town Center', 'Mystic Lakes'], neighborhoods: ['Winchester Center', 'Winchester Highlands'] },
  { name: 'Millville', slug: 'millville', distance: 22.27, county: 'Worcester County', population: '3,500+', zipCodes: ['01529'], landmarks: ['Blackstone River'], neighborhoods: ['Millville Center'] },
  { name: 'Wrentham', slug: 'wrentham', distance: 22.46, county: 'Norfolk County', population: '12,000+', zipCodes: ['02093'], landmarks: ['Wrentham Village Premium Outlets', 'Wrentham Town Common'], neighborhoods: ['Wrentham Center', 'Sheldonville'] },
  { name: 'Cambridge', slug: 'cambridge', distance: 22.53, county: 'Middlesex County', population: '118,000+', zipCodes: ['02138', '02139', '02140', '02141', '02142'], landmarks: ['Harvard University', 'MIT', 'Harvard Square', 'Kendall Square'], neighborhoods: ['Harvard Square', 'Central Square', 'Kendall Square', 'Porter Square'] },
  { name: 'Douglas', slug: 'douglas', distance: 22.66, county: 'Worcester County', population: '9,000+', zipCodes: ['01516'], landmarks: ['Douglas State Forest', 'Wallum Lake'], neighborhoods: ['Douglas Center', 'East Douglas'] },
  { name: 'Dunstable', slug: 'dunstable', distance: 22.75, county: 'Middlesex County', population: '3,500+', zipCodes: ['01827'], landmarks: ['Dunstable Town Common'], neighborhoods: ['Dunstable Center'] },
  { name: 'Lowell', slug: 'lowell', distance: 22.86, county: 'Middlesex County', population: '115,000+', zipCodes: ['01850', '01851', '01852', '01853', '01854'], landmarks: ['Lowell National Historical Park', 'Merrimack River', 'UMass Lowell'], neighborhoods: ['Downtown Lowell', 'Belvidere', 'Centralville', 'Highlands'] },
  { name: 'Blackstone', slug: 'blackstone', distance: 22.89, county: 'Worcester County', population: '9,500+', zipCodes: ['01504'], landmarks: ['Blackstone River', 'Blackstone Gorge'], neighborhoods: ['Blackstone Center', 'Millville'] },
  { name: 'Oxford', slug: 'oxford', distance: 22.90, county: 'Worcester County', population: '14,000+', zipCodes: ['01540'], landmarks: ['Clara Barton Birthplace Museum'], neighborhoods: ['Oxford Center', 'North Oxford'] },
  { name: 'Somerville', slug: 'somerville', distance: 22.92, county: 'Middlesex County', population: '81,000+', zipCodes: ['02143', '02144', '02145'], landmarks: ['Davis Square', 'Assembly Row', 'Union Square'], neighborhoods: ['Davis Square', 'Union Square', 'Ball Square', 'Teele Square'] },
  { name: 'Medford', slug: 'medford', distance: 22.93, county: 'Middlesex County', population: '58,000+', zipCodes: ['02155'], landmarks: ['Tufts University', 'Mystic River'], neighborhoods: ['Medford Square', 'West Medford', 'South Medford'] },
  { name: 'Westminster', slug: 'westminster', distance: 23.06, county: 'Worcester County', population: '8,000+', zipCodes: ['01473'], landmarks: ['Wachusett Meadow Wildlife Sanctuary'], neighborhoods: ['Westminster Center'] },
  { name: 'Wilmington', slug: 'wilmington', distance: 23.35, county: 'Middlesex County', population: '24,000+', zipCodes: ['01887'], landmarks: ['Wilmington Town Common', 'Silver Lake'], neighborhoods: ['Wilmington Center'] },
  { name: 'Townsend', slug: 'townsend', distance: 23.41, county: 'Middlesex County', population: '9,000+', zipCodes: ['01469'], landmarks: ['Townsend Harbor', 'Squannacook River'], neighborhoods: ['Townsend Center', 'Townsend Harbor'] },
  { name: 'Tyngsboro', slug: 'tyngsboro', distance: 23.46, county: 'Middlesex County', population: '12,000+', zipCodes: ['01879'], landmarks: ['Merrimack River', 'Tyngsboro Bridge'], neighborhoods: ['Tyngsboro Center'] },
  { name: 'Spencer', slug: 'spencer', distance: 23.96, county: 'Worcester County', population: '12,000+', zipCodes: ['01562'], landmarks: ['Spencer State Forest', 'Lake Whittemore'], neighborhoods: ['Spencer Center', 'East Spencer'] },
  { name: 'Woonsocket', slug: 'woonsocket-ri', distance: 23.97, county: 'Providence County, RI', population: '43,000+', zipCodes: ['02895'], landmarks: ['Museum of Work and Culture', 'Blackstone River'], neighborhoods: ['Downtown Woonsocket', 'Fairmount'] },
  { name: 'Tewksbury', slug: 'tewksbury', distance: 24.05, county: 'Middlesex County', population: '31,000+', zipCodes: ['01876'], landmarks: ['Tewksbury Hospital', 'Livingston Street'], neighborhoods: ['Tewksbury Center', 'North Tewksbury'] },
  { name: 'Canton', slug: 'canton', distance: 24.36, county: 'Norfolk County', population: '24,000+', zipCodes: ['02021'], landmarks: ['Blue Hills Reservation', 'Canton Junction'], neighborhoods: ['Canton Center', 'Canton Junction'] },
  { name: 'Sharon', slug: 'sharon', distance: 24.39, county: 'Norfolk County', population: '18,000+', zipCodes: ['02067'], landmarks: ['Lake Massapoag', 'Sharon Town Center'], neighborhoods: ['Sharon Center', 'East Sharon'] },
  { name: 'Stoneham', slug: 'stoneham', distance: 24.48, county: 'Middlesex County', population: '23,000+', zipCodes: ['02180'], landmarks: ['Stoneham Square', 'Spot Pond'], neighborhoods: ['Stoneham Square', 'South Stoneham'] },
  { name: 'Boston', slug: 'boston', distance: 24.81, county: 'Suffolk County', population: '675,000+', zipCodes: ['02108', '02109', '02110', '02111', '02113', '02114', '02115', '02116', '02118', '02119', '02120', '02121', '02122', '02124', '02125', '02126', '02127', '02128', '02129', '02130', '02131', '02132', '02134', '02135', '02136', '02163', '02199', '02203', '02210', '02215'], landmarks: ['Freedom Trail', 'Fenway Park', 'Boston Common', 'Faneuil Hall'], neighborhoods: ['Back Bay', 'Beacon Hill', 'North End', 'South End', 'Charlestown', 'South Boston', 'Dorchester', 'Roxbury'] },
  { name: 'Foxborough', slug: 'foxborough', distance: 24.83, county: 'Norfolk County', population: '18,000+', zipCodes: ['02035'], landmarks: ['Gillette Stadium', 'Patriot Place'], neighborhoods: ['Foxborough Center'] },

  // 50+ MILES - Extended Service Area
  { name: 'New Bedford', slug: 'new-bedford', distance: 55.0, county: 'Bristol County', population: '101,000+', zipCodes: ['02740', '02741', '02742', '02743', '02744', '02745', '02746'], landmarks: ['New Bedford Whaling Museum', 'Buttonwood Park Zoo', 'Fort Taber Park'], neighborhoods: ['Downtown New Bedford', 'South End', 'North End', 'West End', 'Acushnet Heights'] }
]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug)
}

export function getCitiesByDistance(maxDistance: number): City[] {
  return cities.filter(city => city.distance <= maxDistance)
}
