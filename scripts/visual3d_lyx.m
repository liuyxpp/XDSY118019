function [  ] = visual3d_lyx(phi_a,phi_b,phi_c,isoval,aa,repeat)
% Visualizing volumetric data upto three components in a cubic cell.
%   since 2010.4.14
%   coded by Yi-Xin Liu @ Fudan
%   contact: lyx@fudan.edu.cn
%   %usage:
%       visual3d_lyx()
%       input var
%           phi_a: volume data of component A
%           phi_b: volume data of component B
%           phi_c: volume data of component C
%           isoval: iso-value
%           aa: alpha-value
%           repeat: a vector with length 3 for repmat use
%       output var
%           none
%       output
%           figure/image file
% $ Revision: 2022.10.10 $

switch nargin
    case 3
        isoval = [0.2,0.4,0.4];
        aa = [0.6,0.6,0.6];
        repeat = [2,2,2];
    case 4
        aa = [0.6,0.6,0.6];
        repeat = [2,2,2];
    case 5
        repeat = [2,2,2];
end

figure;
% Smooth data before visualization
phi_a=smooth3(phi_a,'box',5);
phi_b=smooth3(phi_b,'box',5);
phi_c=smooth3(phi_c,'box',5);

% Repeat data in each dimension
phi_a = repmat(phi_a,repeat);
phi_b = repmat(phi_b,repeat);
phi_c = repmat(phi_c,repeat);

% Create the isosurface and set properties
%isoval=0.33;
ha=patch(isosurface(phi_a,isoval(1)),...
        'FaceColor','red',...
        'EdgeColor','none',...
        'AmbientStrength',0.2,...
        'SpecularStrength',0.7,...
        'DiffuseStrength',0.4);
isonormals(phi_a,ha)
alpha(aa(1))
% Create the isocaps and set Properties
patch(isocaps(phi_a,isoval(1)),...
        'FaceColor','red',...
        'EdgeColor','none');
% Set transparency of caps
alpha(aa(1))

hb=patch(isosurface(phi_b,isoval(2)),...
        'FaceColor','green',...
        'EdgeColor','none',...
        'AmbientStrength',0.2,...
        'SpecularStrength',0.7,...
        'DiffuseStrength',0.4);
isonormals(phi_b,hb)
alpha(aa(2))
patch(isocaps(phi_b,isoval(2)),...
        'FaceColor','green',...
        'EdgeColor','none')
alpha(aa(2))

hc=patch(isosurface(phi_c,isoval(3)),...
        'FaceColor','blue',...
        'EdgeColor','none',...
        'AmbientStrength',0.2,...
        'SpecularStrength',0.7,...
        'DiffuseStrength',0.4);
isonormals(phi_c,hc)
alpha(aa(3))
patch(isocaps(phi_c,isoval(3)),...
        'FaceColor','blue',...
        'EdgeColor','none')
alpha(aa(3))

%colormap hsv
% Define the View
daspect([1,1,1])
axis equal
axis tight
%grid on
view(3)
% Add lighting
camlight right
camlight left
%set(gcf,'Renderer','zbuffer');
lighting phong

%%%% Prettify figure export
axis off
ti = get(gca, 'TightInset');
set(gca, 'Position', [ti(1) ti(2) 1-ti(3)-ti(1) 1-ti(4)-ti(2)]);
set(gca,'Units','Inches');
pos = get(gca, 'Position');
ti = get(gca, 'TightInset');
w = pos(3)+ti(1)+ti(3);
h = pos(4)+ti(2)+ti(4);
set(gcf, 'PaperUnits', 'Inches');
set(gcf, 'PaperSize', [w h]);
set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperPosition', [0 0 w h]);
%saveas(gcf, 'phiAB_mat.png');
print('phiAB','-dpng','-r300');
end

